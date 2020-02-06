import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/policy.service';
import { Policy } from 'src/app/policy.model';

@Component({
  selector: 'policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {
  iterable = [1, 2, 3];
  policies: Policy[];
  constructor(private policyService: PolicyService) { }

  ngOnInit() {
    this.policyService.getPolicies().subscribe(actions => {
      this.policies =  actions.map(a => {
        const data = a.payload.doc.data() as Policy;
        const id = a.payload.doc.id;
        return {...data, id} as Policy;
      });
    });
  }


  create(policy: Policy) {
    this.policyService.createPolicy(policy);
  }

  update(policy: Policy) {
    this.policyService.updatePolicy(policy);
  }

  delete(id: string) {
    this.policyService.deletePolicy(id);
  }

  addPolicy() {
    let myPolicy: Policy = {
      id: '2',
      policyNumber: "string",
      creationDate: new Date,
      effectiveDate: new Date,
      expireDate: new Date,
      paymentOption: "string",
      policyAmount: 1,
      extraInfo: "string"
    }

    this.create(myPolicy)
    console.log("ue")
    console.log(this.policies)
  }
  printValues(){
    console.log(typeof this.policies)
    console.log(this.policies)
  }
  deletar(){
    this.delete('6CfzcpKkesE7N9eMQj3n')
  }




}
