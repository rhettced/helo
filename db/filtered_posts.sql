-- select * from posts
-- where title ilike ${sqlSearch};

select * from posts
join users on users.id=posts.author_id
where title ilike ${sqlSearch}; 