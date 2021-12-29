import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _cat: CategoryService,
    private _router: Router
  ) { }

  quesId =0;
  question;
  categories;

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params.quesId;
    // alert(this.qId);
    this._question.getQuestionsOfQuiz(this.quesId).subscribe(
        (data: any) => {
          this.question = data;
          console.log(this.question);
        },
        (error) => {
          console.log(error);
        }
      );
  
      this._cat.categories().subscribe(
        (data: any) => {
          this.categories = data;
        },
        (error) => {
          alert('error in loading categories');
        }
      );
    }
  
    //update form submit
    public updateData() {
      //validatate
  
      this._question.updateQuestion(this.question).subscribe(
        (data) => {
          Swal.fire('Success !!', 'question updated', 'success').then((e) => {
            this._router.navigate(['/admin/question']);
          });
        },
        (error) => {
          Swal.fire('Error', 'error in updating quiz', 'error');
          console.log(error);
        }
      );
    }
  }


