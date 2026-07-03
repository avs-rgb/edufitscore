# EduFitScore Architecture

## System Map

```mermaid
flowchart TD
  Browser[Browser UI\npublic/index.html + public/app.js + public/styles.css]
  Server[Express Server\nserver.js]
  Workbook[Default Score Workbooks\nlib/workbook.js + data/*.json]
  Mailer[Email Layer\nlib/mailer.js]
  DBSelector[DB Selector\nlib/auth-db.js]
  SQLite[Local SQLite\nlib/auth-db-sqlite.js\ndata/auth.db]
  Postgres[Production Postgres/Neon\nlib/auth-db-postgres.js]
  Static[Static Assets\npublic/*]

  Browser -->|fetch API| Server
  Browser -->|loads| Static
  Server --> Workbook
  Server --> Mailer
  Server --> DBSelector
  DBSelector -->|local/dev| SQLite
  DBSelector -->|DATABASE_URL| Postgres
```

## Main Frontend Areas

```mermaid
flowchart TD
  App[public/app.js]
  Auth[Auth Screens\nlogin/signup/reset]
  Student[Student Scoring]
  Teacher[Teacher Classes]
  SchoolAdmin[School Admin]
  GlobalAdmin[Global Admin]

  App --> Auth
  App --> Student
  App --> Teacher
  App --> SchoolAdmin
  App --> GlobalAdmin

  Student --> DefaultTables[Default Built-in Tables]
  Student --> SchoolTables[Uploaded School Tables]
  Teacher --> ClassMgmt[Class Management]
  Teacher --> BulkScoring[Bulk Score Conversion]
  Teacher --> History[History/Semesters]
  SchoolAdmin --> Memberships[Teacher Approvals]
  SchoolAdmin --> ScoreTableMgmt[School Score Tables]
  ScoreTableMgmt --> ExcelImport[Excel Template/Import]
```

## Auth And Session Flow

```mermaid
sequenceDiagram
  participant User
  participant Browser as Browser app.js
  participant Server as server.js
  participant DB as auth-db layer

  User->>Browser: submit login
  Browser->>Server: POST /api/auth/login
  Server->>DB: verifyUser(email,password)
  DB-->>Server: user
  Server->>DB: createSession(userId)
  Server-->>Browser: session cookie + user
  Browser->>Server: GET /api/auth/me
  Server->>DB: findUserBySessionToken
  Server-->>Browser: authenticated user + memberships
```

## Default Student Scoring Flow

```mermaid
flowchart TD
  SelectDefault[Select default source\nבנים/בנות + grade] --> RenderDefault[Render default metric inputs]
  RenderDefault --> Submit[חשב ציון]
  Submit --> ApiScore[POST /api/score]
  ApiScore --> Workbook[lib/workbook.js scoreMetric]
  Workbook --> Result[Scores + average]
  Result --> UI[Render result cards]
```

## Uploaded School Table Scoring Flow

```mermaid
flowchart TD
  SelectSchool[Select school source] --> LoadTables[GET /api/schools/:schoolId/score-tables]
  LoadTables --> Filters[Grade/group buttons from existing school tables]
  Filters --> RenderInputs[Render uploaded subjects as inputs]
  RenderInputs --> Calculate[חשב ציון / המרת ציונים]
  Calculate --> LocalMatch[Client-side threshold match]
  LocalMatch --> Direction[Auto-detect higher/lower is better]
  Direction --> Fallback[Use exact match or next lower score threshold]
  Fallback --> Results[Render score + matched threshold]
```

## School Admin Score Table Management

```mermaid
flowchart TD
  Admin[School Admin] --> Page[טבלאות ציונים בית ספריות]
  Page --> Settings[Grade range settings]
  Page --> Cards[Existing table cards]
  Page --> Create[Create table form]
  Page --> Import[Excel import]
  Page --> Builder[Table builder grid]

  Create --> CreateApi[POST /api/school-admin/score-tables]
  Import --> ImportApi[POST /api/school-admin/score-tables/import]
  Builder --> UpdateApi[PUT /api/school-admin/score-tables/:id]
  Cards --> DeleteApi[DELETE /api/school-admin/score-tables/:id]

  CreateApi --> SQLiteTables[school_score_tables]
  ImportApi --> ParseXlsx[server.js parses XLSX sheets]
  ParseXlsx --> SQLiteTables
  UpdateApi --> SQLiteTables
  DeleteApi --> SQLiteTables
```

## Excel Template And Import

```mermaid
flowchart TD
  Generator[scripts/build-school-score-template.js] --> WorkbookFile[school-score-table-template-all-grades.xlsx]
  WorkbookFile --> PublicCopy[public/school-score-table-template-all-grades.xlsx]
  PublicCopy --> DownloadButton[הורדת תבנית Excel]
  UserEdit[User edits Excel] --> Upload[ייבוא מ-Excel]
  Upload --> ImportRoute[POST /api/school-admin/score-tables/import]
  ImportRoute --> Parse[Parse B1/B2/B3, row 5 subjects, rows 6+ scores]
  Parse --> Validate[Grade range, group, duplicates, max 36]
  Validate --> Save[createSchoolScoreTable]
```

## Teacher Class Workflow

```mermaid
flowchart TD
  TeacherHome[Teacher class home] --> NewClass[Create class]
  NewClass --> ClassPayload[name, grade, gender, schoolId, roster]
  ClassPayload --> CreateClassApi[POST /api/teacher/classes]
  CreateClassApi --> TeacherClasses[teacher_classes table]
  TeacherClasses --> OpenClass[Open class workspace]
  OpenClass --> SyncSchool[If schoolId exists, select school score source]
  SyncSchool --> EntryTable[Render input table]
  EntryTable --> Convert[המרת ציונים לכל הכיתה]
  Convert --> ResultsTable[Converted results table]
  ResultsTable --> SaveHistory[Save history]
  SaveHistory --> HistoryTable[class_history]
```

## Database Split

```mermaid
flowchart LR
  AuthDB[lib/auth-db.js] --> SQLite[SQLite local implementation]
  AuthDB --> Postgres[Postgres production implementation]

  SQLite --> Users[users]
  SQLite --> Sessions[sessions]
  SQLite --> Schools[schools]
  SQLite --> Memberships[school_memberships]
  SQLite --> Classes[teacher_classes]
  SQLite --> History[teacher_class_history]
  SQLite --> ScoreSettings[school_score_table_settings]
  SQLite --> ScoreTables[school_score_tables]

  Postgres --> ProdNote[Production parity required\nfor newer school score-table features]
```

## Important Local-Only Gap

The school-admin score-table workflow is currently implemented locally in SQLite. Before pushing this workflow to production, the matching PostgreSQL/Neon implementation must be completed in `lib/auth-db-postgres.js`.
