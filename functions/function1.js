let allinfo=[];
function Drugs(  generic_name ,brand_name, dosage_form, pharm_class){
this .generic_name=generic_name,
this.brand_name=brand_name,
this.dosage_form=dosage_form,
this.pharm_class=pharm_class,
allinfo.push(this)

}
module.exports=Drugs