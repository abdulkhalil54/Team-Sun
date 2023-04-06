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

#curr.execute("CREATE TABLE application(id integer, name varchar(30));")
#curr.execute("INSERT INTO application(id, name) VALUES (5, 'lol');")
curr.execute('SELECT * FROM application;')

res = curr.fetchall()
print(res)


# name   | ..... | attachments : [string] (foreign key)
# John |   ..... |   [resume.pdf]
#DOe   |  .....  |   [resume.pdf]

# file_id | link
#1         | https://attachments-429-manager-app.s3.amazonaws.com/credentials
#2         | https://attachments-429-manager-app.s3.amazonaws.com/doe_2.pdf