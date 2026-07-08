import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Student{
  id:number;
  name:string;
  age:number;
  course:string;
  department:string;
  email:string;
  phone:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule,CommonModule]
})
export class App {
id:number=0;
name:string="";
age:number=0;
course:string="";
department:string=""; 
email:string="";
phone:string="";

found:Student | null=null
not:boolean=false
searchid:number=0

editIndex:number=-1

student:Student[]=[
  {id:1,name:"sameer",age:22,course:"MCA",department:"computer application",email:"sksameer51067@gmail.com",phone:"9392747274"}
]

addstudent():void{
  if(
    this.id==0 ||
    this.name=="" ||
    this.age==0 ||
    this.course=="" ||
    this.department=="" ||
    this.email==""  ||
    this.phone==""
  ){
   alert("Fill the Form")
   return;
  }
  let exist=this.student.some(s=>s.id==this.id);
  if(exist){
    alert("This id already exist")
    return;
  }
  this.student.push(
    {
      id:this.id,
      name:this.name,
      age:this.age,
      course:this.course,
      department:this.department,
      email:this.email,
      phone:this.phone


    }
    
  )
  localStorage.setItem("student",JSON.stringify(this.student))
this.clearForm()
}

deletestudent(index:number):void{
  let dele=confirm("Are you sure to delete")
  if(dele){
  this.student.splice(index,1)
  localStorage.setItem("student",JSON.stringify(this.student))
alert("Student deleted successfully")
  }
}


editstudent(index:number):void{

  this.editIndex=index;

  this.id=this.student[index].id;
  this.name=this.student[index].name;
  this.age=this.student[index].age;
  this.course=this.student[index].course;
  this.department=this.student[index].department;
  this.email=this.student[index].email;
  this.phone=this.student[index].phone;

}

searchstudent(id:number):void{
this.found=null
this.not=true
for(let i=0;i<this.student.length;i++){
  if(this.student[i].id==id){
    this.not=false
    this.found=this.student[i]
  }
}
}
updatestudent():void{

this.student[this.editIndex]={

id:this.id,
name:this.name,
age:this.age,
course:this.course,
department:this.department,
email:this.email,
phone:this.phone

};
localStorage.setItem("student",JSON.stringify(this.student))

this.clearForm();

}
clearForm():void{

this.id=0;
this.name="";
this.age=0;
this.course="";
this.department="";
this.email="";
this.phone="";
this.editIndex=-1;

}

canceledit():void{
  this.clearForm()
}
constructor(){

  let data = localStorage.getItem("student");

  if(data){
    this.student=JSON.parse(data);
  }
}

}

