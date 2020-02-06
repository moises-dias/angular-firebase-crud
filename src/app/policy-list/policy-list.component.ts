import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/policy.service';
import { Policy } from 'src/app/policy.model';
import { Product } from 'src/app/product.model';

@Component({
  selector: 'policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})

export class PolicyListComponent implements OnInit {
  policies: Policy[];
  productsList: Product[];

  constructor(private policyService: PolicyService) { }

  ngOnInit() {
    this.policyService.getPolicies().subscribe(actions => {
      this.policies = actions.map(a => {
        const data = a.payload.doc.data() as Policy;
        const id = a.payload.doc.id;
        return { ...data, id } as Policy;
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



}
