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


curr.execute("""SELECT * FROM information_schema.tables
       WHERE table_schema = 'public'""")
for table in curr.fetchall():
    print(table)

# def delete_main_tables():
#     curr.execute("DROP TABLE Applications")
#     curr.execute("DROP TABLE Students")
#     curr.execute("DROP TABLE Sections")

# #SQL query strings to create tables:
# createApplications = "CREATE TABLE Applications(username varchar(50), firstName varchar(50), lastName varChar(50), year varchar(10), gpa float, grade320 char, reference varchar(200), attachment varchar(100));"
# createStudents = "CREATE TABLE Students(username varchar(50), conflict int, ranking int, sectionRanked int, matched int);"
# createSections = "CREATE TABLE Sections(id int, day varchar(10), time varchar(30), username varchar(50), applicant varchar(50), capacity int, numEnrolled int)"

# #APPLICATIONS TABLE with dummy values:
# curr.execute(createApplications)
# curr.execute("INSERT INTO Applications(username, firstName, lastName, year, gpa, grade320, reference, attachment) VALUES ('testusername', 'testFirst', 'testLast', 'Freshman', 3.2, 'A', 'first last, email', 'testattachment')")

# #STUDENTS TABLE with dummy values: 
# curr.execute(createStudents)
# curr.execute("INSERT INTO Students(username, conflict, ranking, sectionRanked, matched) VALUES ('testusername', -1, -1, -1, -1);")

# #SECTIONS TABLE with dummy values: 
# curr.execute(createSections)
# curr.execute("INSERT INTO Sections(id, day, time, username, applicant, capacity, numEnrolled) VALUES (3, 'MonWed', '11:30 AM - 12:45 PM', 'testProfusername', 'testStudusername', 50, 2);")
# curr.execute("INSERT INTO Sections(id, day, time, username, applicant, capacity, numEnrolled) VALUES (3, 'second', '11:30 AM - 12:45 PM', 'SECOND', 'SECONDapplicant', 20, 7);")

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

# # ----------------

# # name   | ..... | attachments : [string] (foreign key)
# # John |   ..... |   [resume.pdf]
# #DOe   |  .....  |   [resume.pdf]

# # file_id | link
# #1         | https://attachments-429-manager-app.s3.amazonaws.com/credentials
# #2         | https://attachments-429-manager-app.s3.amazonaws.com/doe_2.pdf



# # possible rename functionality
# # source: https://stackoverflow.com/questions/21184720/how-to-rename-files-and-folder-in-amazon-s3
# def rename(fileKey, newFileKey):
#     s3Client.copyObject(bucketName, fileKey, bucketName, newFileKey)
#     s3Client.deleteObject(bucketName, fileKey)
