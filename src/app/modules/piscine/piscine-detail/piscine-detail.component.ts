import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-piscine-detail',
  templateUrl: './piscine-detail.component.html',
  styleUrls: ['./piscine-detail.component.scss'],
})
export class PiscineDetailComponent implements OnInit {
  constructor(private AR: ActivatedRoute) {}

  // save data in local variables
  applicant: any;
  profilePicture: any;
  gender: string = '';
  phone: string = '';
  email: string = '';
  nationality: string = '';
  progresses: [] = [];
  qualification: string = '';
  specialization: string = '';

  ngOnInit(): void {
    this.AR.data.subscribe((response: any) => {
      // get the applicants information

      console.log(response);
      this.applicant = response.candidate.candidate;
      this.profilePicture = response.candidate.profileImage;
      this.gender = this.applicant['gender']
        ? this.applicant['gender']
        : this.applicant['genders'];
      this.phone = this.applicant['phone']
        ? this.applicant['phone']
        : this.applicant['phoneNumber'];
      this.email = this.applicant['email'];
      this.nationality = this.applicant['nationality'];
      this.qualification = this.applicant['acadamicQualification'];
      this.specialization = this.applicant['acadamicSpecialization'];
      console.log(this.applicant);
      console.log(this.profilePicture);
    });
  }
}
