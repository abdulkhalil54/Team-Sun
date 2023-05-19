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
        self.createApplicationsQuery = "CREATE TABLE applicationInfo(username varchar(50) primary key, name varchar(100), year varchar(10), grade char, \
            referenceName varchar(100), referenceContact varchar(100), attachment varchar(200), preferences integer[4][2], status int);"
        self.createSectionsQuery = "CREATE TABLE Sections(id int, day varchar(10), time varchar(30), username varchar(50), applicant varchar(50), capacity int, numEnrolled int)"
        self.createProfessorsQuery = "CREATE TABLE Professors(username varchar(50), section int, ranking int, appRanked varchar(50))"
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
        self.cursor.execute("DROP TABLE Sections")
        self.cursor.execute("DROP TABLE Professors")
        self.cursor.execute("DROP TABLE Users")
        self.cursor.execute("DROP TABLE Matchings")
    # ------------------------------------------------------------------------------------------------------
    def createTables(self):
        self.cursor.execute(self.createApplicationsQuery)
        self.cursor.execute(self.createSectionsQuery)
        self.cursor.execute(self.createProfessorsQuery)
        self.cursor.execute(self.createUsersQuery)
        self.cursor.execute(self.createMatchingsQuery)
    # ------------------------------------------------------------------------------------------------------
    def listRows(self, tableName):
        self.cursor.execute(f"SELECT * FROM {tableName}")
        print(f"Contents of table {tableName} are:")
        for row in self.cursor.fetchall():
            print(row)  

    # fill dummy values into _test tables 
    # the dummy values are rough / inconsistent at the moment... simply a testing area
    def fill_dummy_values(self):
        #Applications_test: 
        self.cursor.execute("INSERT INTO Applications_test(username, firstName, lastName, year, gpa, grade320, reference, attachment) VALUES ('testusername', 'testFirst', 'testLast', 'Freshman', 3.2, 'A', 'first last, email', 'testattachment')")
        #Students_test:
        self.cursor.execute("INSERT INTO Students_test(username, conflict, ranking, sectionRanked, matched) VALUES ('testusername', -1, -1, -1, -1);")
        #Sections_test:
        self.cursor.execute("INSERT INTO Sections_test(id, day, time, username, applicant, capacity, numEnrolled) VALUES (3, 'MonWed', '11:30 AM - 12:45 PM', 'testProfusername', 'testStudusername', 50, 2);")
        self.cursor.execute("INSERT INTO Sections_test(id, day, time, username, applicant, capacity, numEnrolled) VALUES (3, 'second', '11:30 AM - 12:45 PM', 'SECOND', 'SECONDapplicant', 20, 7);")
        #Professors_test:
        self.cursor.execute("INSERT INTO Professors_test(username, section, ranking, appRanked) VALUES ('testProfUsername', 3, 1, 'testStudUsername')")
        #Users_test:
        self.cursor.execute("INSERT INTO Users_test(username, password, type, firstName, lastName) VALUES ('testUsername', 'testPassword', True, 'testFName', 'testLName')")
        #Matchings_test:
        self.cursor.execute("INSERT INTO Matchings_test(section, username) VALUES (3, 'testStudUsername')")
        self.cursor.execute("INSERT INTO Matchings_test(section, username) VALUES (3, 'testStudUsername2')")   
