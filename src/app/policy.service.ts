import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Policy } from 'src/app/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private firestore: AngularFirestore) { }
  // C
  createPolicy(policy: Policy) {
    return this.firestore.collection('policies').add(policy);
  }
  // R
  getPolicies() {
    return this.firestore.collection('policies').snapshotChanges();
  }
  // U
  updatePolicy(policy: Policy) {
    delete policy.id;
    this.firestore.doc('policies/' + policy.id).update(policy);
  }
  // D
  deletePolicy(policyId: string) {
    this.firestore.doc('policies/' + policyId).delete();
  }
}

