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

def printTableList():
    curr.execute("""SELECT * FROM information_schema.tables
        WHERE table_schema = 'public'""")
    for table in curr.fetchall():
        print(table)

def deleteCurrentTables():
    curr.execute("DROP TABLE Passwords")
    curr.execute("DROP TABLE Applications")
    curr.execute("DROP TABLE Students")
    curr.execute("DROP TABLE Sections")

#SQL query strings to create tables:
def createNewTables():
    #SQL query strings to create tables:
    createPasswords = "CREATE TABLE Passwords(username varchar(30) primary key, password varchar(256))"
    createApplications = "CREATE TABLE Applications(username varchar(50), firstName varchar(50), lastName varChar(50), year varchar(10), gpa float, grade320 char, reference varchar(200), attachment varchar(100));"
    createStudents = "CREATE TABLE Students(username varchar(50), conflict int, ranking int, sectionRanked int, matched int);"
    createSections = "CREATE TABLE Sections(id int, day varchar(10), time varchar(30), username varchar(50), applicant varchar(50), capacity int, numEnrolled int)"
    curr.execute(createApplications)
    curr.execute(createStudents)
    curr.execute(createSections)
    curr.execute(createPasswords)

def addDummyValues():
    curr.execute("INSERT INTO Applications(username, firstName, lastName, year, gpa, grade320, reference, attachment) VALUES ('testusername', 'testFirst', 'testLast', 'Freshman', 3.2, 'A', 'first last, email', 'testattachment')")
    curr.execute("INSERT INTO Students(username, conflict, ranking, sectionRanked, matched) VALUES ('testusername', -1, -1, -1, -1);")
    curr.execute("INSERT INTO Sections(id, day, time, username, applicant, capacity, numEnrolled) VALUES (3, 'MonWed', '11:30 AM - 12:45 PM', 'testProfusername', 'testStudusername', 50, 2);")
    curr.execute("INSERT INTO Sections(id, day, time, username, applicant, capacity, numEnrolled) VALUES (3, 'second', '11:30 AM - 12:45 PM', 'SECOND', 'SECONDapplicant', 20, 7);")



#createNewTables()
#printTableList()
curr.execute("SELECT password FROM Passwords where username ='chinguun'");
print(curr.fetchall())

# #curr.execute("Select * FROM Applications LIMIT 0")
# #colnames = [desc[1] for desc in curr.description]
# #print(colnames)

# #retrieval process
# curr.execute('SELECT * FROM Sections;')
# #curr.execute('SELECT * FROM Students;')
# res = curr.fetchall()
# print(res)

# #FUNCTIONS possibly

# #take student username which is application identifer, return year in application
# def getYear(username):
#     curr.execute('SELECT * FROM Applications;')
#     table = curr.fetchall()
#     for row in table:
#         if row[0] == username:
#             return row[3]

#     return "ERROR: username not found in table"

# #take section id and return number of applicants currently in application pool
# def getNumApps(id):
#     curr.execute('SELECT * FROM Sections;')
#     table = curr.fetchall()

#     numApps = 0
#     for row in table:
#         if row[0] == id:
#             numApps += 1
    
#     return numApps

# # input: section ID, output: list of usernames of students currently in the application pool for this section (empty if no applicants)
# def getNamesApps(id):
#     curr.execute('SELECT * FROM Sections;')
#     table = curr.fetchall()

#     namesApps = []
#     for row in table:
#         if row[0] == id:
#             namesApps.append(row[4])
    
#     return namesApps

# print(getNamesApps(3))



# # possible rename functionality
# # source: https://stackoverflow.com/questions/21184720/how-to-rename-files-and-folder-in-amazon-s3
# def rename(fileKey, newFileKey):
#     s3Client.copyObject(bucketName, fileKey, bucketName, newFileKey)
#     s3Client.deleteObject(bucketName, fileKey)
