import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatYYYYDDMMHHMM, getUser } from 'src/app/constants/globalMethods';
import { PISCINE4, SELECTION_POOL_HEADER } from 'src/app/constants/headers';
import {
  SelectData,
  TableButtonOptions,
  TableData,
} from 'src/app/interfaces/interfaces';
import { CommentService } from './services/comment.service';
import { PiscineService } from './services/piscine.service';
import {
  BOSS,
  DECISION_MAKER,
  MARKETING_TEAM,
  OP_TEAM,
  TEAM,
  TECH_ASSISTANCE,
  TECH_TEAM,
} from 'src/app/constants/constants';

@Component({
  selector: 'app-piscine',
  templateUrl: './piscine.component.html',
  styleUrls: ['./piscine.component.scss'],
})
export class PiscineComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private CS: CommentService,
    private PS: PiscineService
  ) {
    // form group
    this.form = this.fb.group({
      searchInput: ['', Validators.required],
    });
  }

  columns = SELECTION_POOL_HEADER;
  // data coming from the API
  applicants: any[] = [];
  // data made for the table
  arrangedApplicants: any[] = [];
  data: TableData[] = [];
  // Stats:
  lastavtivityIn24 = 0;
  lastavtivityIn48 = 0;
  // form
  form: FormGroup;
  // * html constants
  htmlExpression = '';
  break = '<br/>';
  sytleName = '<h5>';
  styleNameEnd = '</h5>';

  // * Comments
  Yanal = '';
  Tech = '';
  Operations = '';
  Marketing = '';
  Assistants = '';
  // confirmation dialog
  dialogTitle = 'Are you sure you want to update the applicant status?';
  message = 'This action is permanent';
  button = 'Dismiss';
  button2 = 'Confirm';
  updatedApplicantId = '';
  // loader
  loader = false;
  // image
  thumbnail: File;
  // show team comments control
  isAllowed = false;
  // * search controlls
  // search loader
  searchValues: SelectData[] = [];
  // search loader
  searchLoader: boolean = false;
  showResults: boolean = false;
  // Decision maker
  decisionMaker: boolean = false;

  ngOnInit(): void {
    // check permissions
    TEAM.forEach((element) => {
      // set to true only if logged in user is part of the team
      if (element === getUser().email) {
        this.isAllowed = true;
      }
    });

    DECISION_MAKER.forEach((element) => {
      // set decision maker only if user is in the group
      if (element === getUser().email) {
        this.decisionMaker = true;
      }
    });
    this.getTableData();
  }

  getTableData() {
    this.AR.data.subscribe((value) => {
      this.applicants = value.applicants;
      //
      this.arrangeData(this.applicants);
      // sort last activity
      this.sortOnLastActivity();
      this.activeInTheLast24();
      this.data = this.constructTableData(this.arrangedApplicants);
    });
  }

  // make table data
  constructTableData(applicants: any[]): TableData[] {
    return applicants.map((res) => {
      // console.log(res['comments']);
      var comments = this.formulateComment(res['comments']);
      var checkpoints = this.checkpointsCount(JSON.parse(res['checkpoints']));
      console.log(checkpoints);

      return {
        // the id, to return back for edit or delete events
        id: res['login'],
        // the data displayed in each row
        data: [
          // sequence,
          // res['profileImage'],
          res['login'],
          res['name'],
          res['phone'],
          res['nationality'],
          // ! This should be crafted as comments here for each cell
          // ? managing director, Tech, Operations, Marketing
          comments['boss'],
          comments['TT'],
          comments['OT'],
          comments['MT'],
          comments['TA'],
          // Adding five comments
          // Yanal,Tech, Operation, Marketing, Students
          // ! put back if the chance allows you too
          res['lastProgress'],
          res['level'],
          res['xp'],

          res['date'],
          res['decision'],
          res['finalComment'],
        ],
        // the action buttons
        profileImage: res['profileImage'],
        actionButtons: this.constructTableButton(),
        checkpoint: checkpoints,
      };
    });
  }

  // make row buttons
  constructTableButton(): TableButtonOptions {
    return {
      // edit button
      edit: {
        isActive: this.decisionMaker,
        text: 'Decision',
      },
      // delete button
      delete: {
        isActive: true,
        text: 'Comment',
      },
    };
  }

  checkpointsCount(checkpoints): number[] {
    var checkpoint1 = 0;
    var checkpoint2 = 0;
    var checkpoint3 = 0;
    const regex1 = /checkpoint-01.+/;
    const regex2 = /checkpoint-02.+/;
    const regex3 = /checkpoint-03.+/;

    console.log(checkpoints);
    checkpoints.forEach((checkpoint) => {
      if (regex1.test(checkpoint['path'])) {
        checkpoint1++;
      } else if (regex2.test(checkpoint['path'])) {
        checkpoint2++;
      } else if (regex3.test(checkpoint['path'])) {
        checkpoint3++;
      }
    });

    return [checkpoint1, checkpoint2, checkpoint3];
  }
  // formulate comments
  formulateComment(comments): any {
    var TT = '';
    var boss = this.sytleName;
    var OT = '';
    var MT = '';
    var TA = '';

    comments.forEach((comment) => {
      TECH_TEAM.forEach((member) => {
        if (member == comment.commentedBy) {
          var author =
            member == TECH_TEAM[0]
              ? 'EH: '
              : member == TECH_TEAM[1]
              ? 'AA: '
              : 'YA: ';
          TT =
            TT + this.sytleName + author + comment.comment + this.styleNameEnd;
        }
      });
      TECH_ASSISTANCE.forEach((member) => {
        if (member == comment.commentedBy) {
          var author =
            member == TECH_ASSISTANCE[0]
              ? 'Amgad: '
              : member == TECH_ASSISTANCE[1]
              ? 'Hawra: '
              : 'Abdeen: ';
          TA =
            TA + this.sytleName + author + comment.comment + this.styleNameEnd;
        }
      });
      OP_TEAM.forEach((member) => {
        if (member == comment.commentedBy) {
          var author =
            member == OP_TEAM[0]
              ? 'SY: '
              : member == OP_TEAM[1]
              ? 'SH: '
              : 'MS: ';
          OT =
            OT + this.sytleName + author + comment.comment + this.styleNameEnd;
        }
      });
      MARKETING_TEAM.forEach((member) => {
        if (member == comment.commentedBy) {
          var author = member == MARKETING_TEAM[0] ? 'DA: ' : 'DA: ';
          MT =
            MT + this.sytleName + author + comment.comment + this.styleNameEnd;
        }
      });
      BOSS.forEach((member) => {
        if (member == comment.commentedBy) {
          var author = member == BOSS[0] ? 'YJ: ' : 'YJ: ';
          boss =
            boss +
            this.sytleName +
            author +
            comment.comment +
            this.styleNameEnd;
        }
      });
    });

    TT = TT && this.isAllowed ? TT : '-';
    OT = OT && this.isAllowed ? OT : '-';
    MT = MT && this.isAllowed ? MT : '-';
    boss = boss && this.isAllowed ? boss : '-';
    TA = TA ? TA : '-';

    return {
      TT: TT,
      boss: boss,
      OT: OT,
      MT: MT,
      TA: TA,
    };
  }

  // arrange data for the table
  async arrangeData(applicants) {
    this.arrangedApplicants = [];
    applicants.forEach((applicant) => {
      // console.log(JSON.parse(applicant['progresses']));
      var length = JSON.parse(applicant['progresses']).length;
      // console.log(res['progresses']?.length ? res['progresses']?.length : 0);
      var lastProgress = 'No Activity';
      var date = '2023-09-03 10:00';
      if (length > 0) {
        lastProgress = JSON.parse(applicant['progresses']);
        lastProgress = lastProgress[length - 1]['path']
          .split('/')
          .slice(-2)
          .join('/');
        date = formatYYYYDDMMHHMM(
          JSON.parse(applicant['progresses'])[length - 1]['updatedAt']
        );
      }

      // console.log(lastProgress);
      // console.log(date);
      this.arrangedApplicants.push({
        login: applicant.platformId,
        name: applicant.firstName + ' ' + applicant.lastName,
        phone: applicant.phone ? applicant.phone : applicant.phoneNumber,
        nationality: applicant.nationality,
        lastProgress: lastProgress,
        date: date,
        profileImage: applicant.profilePicture,
        comments: applicant.comments,
        level: applicant.level,
        xp: applicant.xp,
        checkpoints: applicant.checkpoints,
        decision: applicant.decision
          ? '<h2>' + applicant.decision + '</h2>'
          : '<h2>Maybe</h2>',
        finalComment: applicant.finalComment ?? '-',
      });
    });
  }

  sortOnLastActivity() {
    var lastActivityUsers = this.arrangedApplicants.sort((a, b) => {
      if (b['date'] < a['date']) {
        return -1;
      }
      if (b['date'] > a['date']) {
        return 1;
      }
      return 0;
    });
    this.arrangedApplicants = lastActivityUsers;
    // console.log(lastActivityUsers);
  }

  activeInTheLast24() {
    this.lastavtivityIn24 = 0;
    this.lastavtivityIn48 = 0;
    var nowDate = new Date();
    var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    var beforeYesterday = new Date(new Date().getTime() - 48 * 60 * 60 * 1000);

    this.arrangedApplicants.forEach((applicant) => {
      var lastActivityDate = new Date(applicant.date);
      if (lastActivityDate >= yesterday && lastActivityDate <= nowDate) {
        this.lastavtivityIn24++;
      }
      if (lastActivityDate >= beforeYesterday && lastActivityDate <= nowDate) {
        this.lastavtivityIn48++;
      }
    });
  }

  // TODO: Create a comment by user signed in
  // TODO: Show comment by user signed in
  // TODO: Add comment spaces

  // click event on applicant
  commentCandidate($event) {
    // console.log($event);
    this.updatedApplicantId = $event;
    // add information about the dialog appearing
    this.showDialog();
  }
  imageClicked($event) {
    // console.log($event);
    this.updatedApplicantId = $event;
    // add information about the dialog appearing
    this.uploadPicture();
  }

  // dismiss dialog
  dismiss() {}

  // confirm deleting the applicant comment
  confirmDelete($event) {
    var comment = $event ? $event : '-';
    // TODO: formulate the object needed
    var data = {
      platformId: this.updatedApplicantId,
      comment: comment,
      commentedBy: getUser()['firstName'] + ' ' + getUser()['lastName'],
    };
    this.updateApplicantComment(data);
  }

  // confirm deleting the applicant comment
  uploadDialogClick($event) {
    // var comment = $event ? $event : '-';
    // console.log($event);
    // TODO: formulate the object needed
    // var data = {
    //   platformId: this.updatedApplicantId,
    //   comment: comment,
    //   commentedBy: getUser()['firstName'] + ' ' + getUser()['lastName'],
    // };
    // this.updateApplicantComment(data);
  }

  // show dialog
  async showDialog() {
    document.querySelector<HTMLElement>('#dialog')?.click();
  }

  // show uploadPicture
  async uploadPicture() {
    document.querySelector<HTMLElement>('#uploadImage')?.click();
  }

  // use to update applicant call
  updateApplicantComment(data) {
    this.CS.updateApplicantsComment(data).subscribe((val) => {
      // console.log(val);
      this.updateRoute(data);
    });
  }
  // update route whenevr you are doing anything
  updateRoute($updatedApplicant?) {
    this.router.navigate([], {
      queryParams: {
        rand: Math.random(),
        // startDate: formatYYYYDDMM(this.form.controls.startDate.value),
        // endDate: formatYYYYDDMM(this.form.controls.endDate.value),
        // status: this.form.controls.applicantsStatus.value,
        // gradeStart: this.form.controls.applicantsGradeStart.value,
        // gradeEnd: this.form.controls.applicantsGradeEnd.value,
        // sort: this.form.controls.applicantsSorter.value,
        // updatedApplicant: $updatedApplicant,
      },
    });
  }

  // TODO: show dialog to make decision
  decisionDialog(candidate) {
    // console.log(candidate);
    this.updatedApplicantId = candidate;
    document.querySelector<HTMLElement>('#decisionDialog')?.click();
    // this.router.navigateByUrl('/piscine/view-candidate/' + candidate);
  }

  // TODO: after closing the dialog, update the decison, comment

  // confirm deleting the applicant comment
  confirmDecision($event) {
    var comment = $event['comment'] ? $event['comment'] : '-';
    var decision = $event['decision'] ? $event['decision'] : '-';
    var data = {
      decision: decision,
      comment: comment,
      platformId: this.updatedApplicantId,
    };

    this.CS.updateApplicantDecision(data).subscribe((val) => {
      console.log(val);
      this.updateRoute();
    });
    // console.log(data);
    // TODO: update the decision of the student using platform Id
  }

  syncApplicantsData() {
    this.loader = true;
    var data = PISCINE4;
    this.PS.syncSPApplicants(data).subscribe((value) => {
      // console.log(value);
      this.loader = false;
      this.resetFilters();
    });
  }
  // reset filters
  resetFilters() {
    // this.form.controls.applicantsGradeEnd.setValue('all');
    // this.form.controls.applicantsGradeStart.setValue('all');
    // this.form.controls.startDate.setValue('2023-09-03');
    // this.form.controls.applicantsSorter.setValue('descending');
    // this.form.controls.applicantsStatus.setValue('all');
    // ! uncomment this later
    this.updateRoute();
  }

  getAddedFile = (file) => {
    console.log(file.name);

    const formData = new FormData();
    formData.append('image', file, this.updatedApplicantId);
    this.CS.uploadImage(formData).subscribe((data) => {
      console.log(data);
      // this.updateRoute();
    });
    // What it does:
    // Emits the image from app-upload-file-dragdrop component
    if (file.size > 1000024) {
      // this.errorMsg = 'Image is above 1 MB limit';
    } else {
      // this.errorMsg = null;
    }
    // this.thumbnail = data;
  };

  // search button implementation
  search() {
    this.searchLoader = true;
    this.searchValues = [];
    var searchValue = this.form.controls.searchInput.value;
    if (searchValue != undefined && searchValue != '' && searchValue != null) {
      // TODO: put back like promise syntax
      // TODO: show no results when there is no results
      var searchInput = {
        searchValue: searchValue,
      };
      this.PS.searchApplicants(searchInput)
        .then((applicants) => {
          this.applicants = applicants;
          this.arrangeData(this.applicants);
          this.data = this.constructTableData(this.arrangedApplicants);
        })
        .catch((err) => {
          console.log('Erro response :', err);
        })
        .finally(() => {
          this.searchLoader = false;
        });
    } else {
      this.getTableData();
      this.searchLoader = false;
    }
  }

  cancelSearch() {
    this.getTableData();
    this.searchLoader = false;
    this.showResults = false;
    this.form.controls.searchInput.setValue(null);
  }
}
