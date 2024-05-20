import { AddMarkService } from '../../../services/add-mark.service';
import { AddcoinService } from '../../../services/addcoin.service';
import { Addcoin } from '../../../models/addcoin';
import { AddMark } from '../../../models/addmark';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-mark',
  templateUrl: './add-mark.component.html',
  styleUrl: './add-mark.component.scss'
})
export class AddMarkComponent {
addmark!:AddMark
add_coin! : Addcoin

  
  constructor(private addmarkService:AddMarkService,private addcoinService:AddcoinService){
    this.getall()
    
    console.log(this.numbers)
  }

  studentId = Array()

  getall(){
    this.addmarkService.getAllAddMark().subscribe({
      next:(data)=>{
        this.addmark=data
        console.log(data)
        if (this.addmark != null) {
          if (this.addmark.$values != null) { 
            for (let index = 0; index < this.addmark.$values.length; index++) {
              this.numbers.push(index)     
              // console.log(this.addmark.$values[index].id)
              this.studentId.push(this.addmark.$values[index].id)
            }
          }
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  numbers : number[] = []
  addcoin(e: any){
    const body = Array()
    const nodeList =  e.target.parentNode.childNodes;
    for (let index = 0; index < nodeList.length; index++) {
      var obj ={
        id:String,
        coin:Number
      }
      const element = nodeList[index];
      // console.dir(element.childNodes)
      if (element.childNodes.length == 2){
        var value = element.childNodes[1].childNodes[0].childNodes[0]
        obj.id = this.studentId[index]
        obj.coin = value.value
        value.value = ""
        body.push(obj)
      }
    }
    console.log(body)
    
    for(let i=0;i<body.length;i++){
      if(body[i].coin == "")
        continue
      this.addcoinService.AddCoins(body[i]).subscribe({
        next:(data)=>{
          console.log(data)
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }
}