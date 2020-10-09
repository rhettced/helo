insert into users(
    username,
    password,
    profile_pic
) values(
    ${username},
    ${hash},
    ${profilePic}
)
returning id,username,profile_pic;