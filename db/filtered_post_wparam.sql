select * from posts
join users on users.id=posts.author_id
where title ilike ${sqlSearch} and author_id != ${id}; 

-- select author_id, username from posts
-- join users on users.id=posts.author_id
-- where title ilike '%%' and author_id != 1;


