import psycopg2
conn = psycopg2.connect(
    database="postgres",
    user="admin_sun",
    password="teamsun429",
    host="manager-app-test.cpys0k4l69be.us-east-1.rds.amazonaws.com",
    port='5432'
)
curr = conn.cursor()
conn.autocommit = True

# ------------------------------------------------------------------------------------------------------

# curr.execute("""SELECT * FROM information_schema.tables
#        WHERE table_schema = 'public'""")
# for table in curr.fetchall():
#     print(table)

#SQL query strings to create tables:
createApplications = "CREATE TABLE Applications(username varchar(50), firstName varchar(50), lastName varChar(50), year varchar(10), gpa float, grade320 char, reference varchar(200), attachment varchar(100));"
createStudents = "CREATE TABLE Students(username varchar(50), conflict int, ranking int, sectionRanked int, matched int);"
createSections = "CREATE TABLE Sections(id int, day varchar(10), time varchar(30), username varchar(50), applicant varchar(50), capacity int, numEnrolled int)"
createProfessors = "CREATE TABLE Professors(username varchar(50), section int, ranking int, appRanked varchar(50))"
createUsers = "CREATE TABLE Users(username varchar(50) primary key, password varchar(255), type Boolean, firstName varchar(50), lastName varchar(50))"
createMatchings = "CREATE TABLE Matchings(section int, username varchar(50))"

def delete_main_tables():
    curr.execute("DROP TABLE Applications")
    curr.execute("DROP TABLE Students")
    curr.execute("DROP TABLE Sections")
    curr.execute("DROP TABLE Professors")
    curr.execute("DROP TABLE Users")
    curr.execute("DROP TABLE Matchings")

def create_main_tables():
    curr.execute(createApplications)
    curr.execute(createStudents)
    curr.execute(createSections)
    curr.execute(createProfessors)
    curr.execute(createUsers)
    curr.execute(createMatchings)

# ------------------------------------------------------------------------------------------------------

def delete_test_tables():
    curr.execute("DROP TABLE Applications_test")
    curr.execute("DROP TABLE Students_test")
    curr.execute("DROP TABLE Sections_test")
    curr.execute("DROP TABLE Professors_test")
    curr.execute("DROP TABLE Users_test")
    curr.execute("DROP TABLE Matchings_test")

def create_test_tables():
    curr.execute("CREATE TABLE Applications_test(username varchar(50), firstName varchar(50), lastName varChar(50), year varchar(10), gpa float, grade320 char, reference varchar(200), attachment varchar(100));")
    curr.execute("CREATE TABLE Students_test(username varchar(50), conflict int, ranking int, sectionRanked int, matched int);")
    curr.execute("CREATE TABLE Sections_test(id int, day varchar(10), time varchar(30), username varchar(50), applicant varchar(50), capacity int, numEnrolled int)")
    curr.execute("CREATE TABLE Professors_test(username varchar(50), section int, ranking int, appRanked varchar(50))")
    curr.execute("CREATE TABLE Users_test(username varchar(50) primary key, password varchar(255), type Boolean, firstName varchar(50), lastName varchar(50))")
    curr.execute("CREATE TABLE Matchings_test(section int, username varchar(50))")

# fill dummy values into _test tables 
# the dummy values are rough / inconsistent at the moment... simply a testing area
def fill_dummy_values():

    #Applications_test: 
    curr.execute("INSERT INTO Applications_test(username, firstName, lastName, year, gpa, grade320, reference, attachment) VALUES ('testusername', 'testFirst', 'testLast', 'Freshman', 3.2, 'A', 'first last, email', 'testattachment')")
    
    #Students_test:
    curr.execute("INSERT INTO Students_test(username, conflict, ranking, sectionRanked, matched) VALUES ('testusername', -1, -1, -1, -1);")

    #Sections_test:
    curr.execute("INSERT INTO Sections_test(id, day, time, username, applicant, capacity, numEnrolled) VALUES (3, 'MonWed', '11:30 AM - 12:45 PM', 'testProfusername', 'testStudusername', 50, 2);")
    curr.execute("INSERT INTO Sections_test(id, day, time, username, applicant, capacity, numEnrolled) VALUES (3, 'second', '11:30 AM - 12:45 PM', 'SECOND', 'SECONDapplicant', 20, 7);")

    #Professors_test:
    curr.execute("INSERT INTO Professors_test(username, section, ranking, appRanked) VALUES ('testProfUsername', 3, 1, 'testStudUsername')")

    #Users_test:
    curr.execute("INSERT INTO Users_test(username, password, type, firstName, lastName) VALUES ('testUsername', 'testPassword', True, 'testFName', 'testLName')")

    #Matchings_test:
    curr.execute("INSERT INTO Matchings_test(section, username) VALUES (3, 'testStudUsername')")
    curr.execute("INSERT INTO Matchings_test(section, username) VALUES (3, 'testStudUsername2')")   

delete_main_tables()
create_main_tables()

# ------------------------------------------------------------------------------------------------------

#retrieve (print) any main or _test table:
def printTable(tableName):
    curr.execute('SELECT * FROM ' + tableName + ';')
    res = curr.fetchall()
    print(res)



# ------------------------------------------------------------------------------------------------------