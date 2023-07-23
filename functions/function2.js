let doctorInfo=[];
function Doctors(  Provider_Name ,Specialty, City){
this .Provider_Name=Provider_Name,
this.Specialty=Specialty,
this.City=City,

doctorInfo.push(this)

}
module.exports=Doctors