import psycopg2

class databaseManager:
    def __init__(self):
        self.conn = psycopg2.connect(
            database="postgres",
            user="admin_sun",
            password="teamsun429",
            host="team-sum-database.cpys0k4l69be.us-east-1.rds.amazonaws.com",
            port='5432'
        )
        self.cursor = self.conn.cursor()
        self.conn.autocommit = True
        
        #SQL query strings to create tables:
        self.createApplicationsQuery = "CREATE TABLE applicationInfo(username varchar(50) primary key, name varchar(100), year varchar(10), grade varchar(2), \
            referenceName varchar(100), referenceContact varchar(100), attachment varchar(200), preferences integer[4][2], status int);"
        self.createSectionsInfoQuery = "CREATE TABLE sectionsInfo(id int, firstName varchar(50), lastName varchar(50), email varchar(50), day varchar(10), time varchar(30), capacity int, numEnrolled int)"
        self.createSectionApplicantsQuery = "CREATE TABLE sectionsApplicants(id int, studentUsername varchar(50), professorPreferences int)"
        #self.createSectionsQuery = "CREATE TABLE Sections(id int, day varchar(10), time varchar(30), username varchar(50), applicant varchar(50), capacity int, numEnrolled int)"
        #self.createProfessorsQuery = "CREATE TABLE Professors(profUsername varchar(50), section int, studentUsername varchar(), ranking int, appRanked varchar(50))"
        self.createUsersQuery = "CREATE TABLE Users(username varchar(50) primary key, email varchar(100), password varchar(255), type Boolean, firstName varchar(50), lastName varchar(50))"
        self.createMatchingsQuery = "CREATE TABLE Matchings(section int, username varchar(50))"
    # ------------------------------------------------------------------------------------------------------
    def listTables(self):
        self.cursor.execute("""SELECT * FROM information_schema.tables
            WHERE table_schema = 'public'""")
        for table in self.cursor.fetchall():
            print(table)
    # ------------------------------------------------------------------------------------------------------
    def deleteTables(self):
        self.cursor.execute("DROP TABLE applicationInfo")
        self.cursor.execute("DROP TABLE SectionsInfo")
        self.cursor.execute("DROP TABLE SectionsApplicants")
        #self.cursor.execute("DROP TABLE Professors")
        self.cursor.execute("DROP TABLE Users")
        self.cursor.execute("DROP TABLE Matchings")
    # ------------------------------------------------------------------------------------------------------
    def createTables(self):
        self.cursor.execute(self.createApplicationsQuery)
        self.cursor.execute(self.createSectionsInfoQuery)
        self.cursor.execute(self.createSectionApplicantsQuery)
        #self.cursor.execute(self.createProfessorsQuery)
        self.cursor.execute(self.createUsersQuery)
        self.cursor.execute(self.createMatchingsQuery)
    # ------------------------------------------------------------------------------------------------------
    def listRows(self, tableName):
        self.cursor.execute(f"SELECT * FROM {tableName}")
        print(f"Contents of table {tableName} are:")
        for row in self.cursor.fetchall():
            print(row)  
            
    def addSectionInfo(self):
        self.cursor.execute("INSERT INTO sectionsInfo(id, firstName, lastName, email, day, time, capacity, numEnrolled) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)", (1, "Matt", "rattigan", "mrattigan@umass.edu", "T/Th", "2:30-3:45 PM", 1, 0))
        self.cursor.execute("INSERT INTO sectionsInfo(id, firstName, lastName, email, day, time, capacity, numEnrolled) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)", (2, "Random", "Professor", "random@umass.edu", "M/W", "2:30-3:45 PM", 1, 0))
        self.cursor.execute("INSERT INTO sectionsInfo(id, firstName, lastName, email, day, time, capacity, numEnrolled) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)", (3, "Mysterious", "Professor", "mysterious@umass.edu", "T/Th", "4:00-5:15 PM", 1, 0))
        self.cursor.execute("INSERT INTO sectionsInfo(id, firstName, lastName, email, day, time, capacity, numEnrolled) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)", (4, "My", "Professor", "myprofessor@umass.edu", "T/Th", "8:30-9:45 AM", 2, 0))
