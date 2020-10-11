select * from posts
join users on users.id=posts.author_id
where post_id = ${postid};