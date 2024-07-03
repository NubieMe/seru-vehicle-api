1.  select s.id, s.name as students_name, s.age, c.name as classes_name, 
    t.name as teacher_name, t.subject from students as s inner join classes as c on s.class_id = c.id 
    inner join teachers as t on c.teacher_id = t.id;

2.  select c.id, c.name as classes_name, t.name as teacher_name, t.subject 
    from classes as c inner join teachers as t on c.teacher_id = t.id
    where t.id in (
        select teacher_id from classes group by teacher_id having count(*) > 1
    );

3.  create view student_class_teacher_view as
    select s.id as students_id, s.name as students_name, s.age,
    c.id as classes_id, c.name as classes_name,
    t.id as teacher_id, t.name as teacher_name, t.subject
    from students as s inner join classes as c on s.class_id = c.id
    inner join teachers as t on c.teacher_id = t.id;

4.  create procedure get_student_class_teacher as
    select s.id as students_id, s.name as students_name, s.age,
    c.id as classes_id, c.name as classes_name,
    t.id as teacher_id, t.name as teacher_name, t.subject
    from students as s inner join classes as c on s.class_id = c.id
    inner join teachers as t on c.teacher_id = t.id
    go;

5.  delimiter $$
    create procedure add_student (
        in @name varchar(100),
        in @age int,
        in @class_id int
    )
    begin
        declare student_exist int;

        select count(*) into student_exist from students where name = @name and class_id = @class_id;

        if student_exist > 0 then
            signal sqlstate '45000'
            set message_text = 'Error: Student with same name and/or class already exists'
        else
            insert into students (name, age, class_id)
            values (@name, @age, @class_id);
        end if;
    end$$
    delimiter;