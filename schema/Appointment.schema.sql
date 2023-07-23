create table  if not exists Appointment_table(
    appointment_id  serial primary key,
    Patient_id   foreign key ,
    Doctor_id   foreign key ,
    Reservation_Date    date  not null,  
    Reservation_Time   time  not null,
    Report   varchar(1000)  not null,
   
   );
   