import { ProjectService } from './../../services/project/project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project.model';
import { ExpertService } from '../../services/expert/expert.service';
import { OPTIONS } from 'src/app/models/typeOptions';
@Component({
  selector: 'app-publish-list',
  templateUrl: './publish-list.component.html',
  styleUrls: ['./publish-list.component.scss'],
})
export class PublishListComponent implements OnInit {
  type: number;
  openFilter = -1;
  min = 10;
  max = 10000000;
  steps = 10;
  viewType = 0;
  projects: Project;
  category: string = '';
  address: string = '';
  type_verification: any = '';
  company: string = '';
  services: any;
  experts: any;
  emergency: any = 0;
  load: any;
  filter: any = [];
  price: any = {};
  area: any = {};
  options = OPTIONS;
  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private toastr: ToastrService,
    private Expert: ExpertService
  ) {
    this.type = parseFloat(this.route.snapshot.paramMap.get('type'));
    this.filter.option = parseFloat(this.route.snapshot.paramMap.get('option'));

    this.filter.type = this.type;
    console.log(this.type);

    this.route.queryParams.subscribe((params) => {
      if (params['address']) {
        this.address = params['address'];
      }
      if (params['category']) {
        this.category = params['category'];
      }
    });
  }

  ngOnInit(): void {
    if (this.type == 5) {
      this.getServices();
      this.getExperts(
        this.address,
        this.category,
        this.type_verification,
        this.company,
        this.emergency
      );
      this.getProjects();
    }
      if(this.type == 1){
        this.getProduct();
      }
      if(this.type == 3){
        this.getShared_spaces();
      }
      if(this.type == 4){
        this.getProject();
      }
  }

  getProjects() {
    this.service.searchProject(this.filter).subscribe(
      (res) => {
        this.projects = res.project;
        console.log(this.projects);
      },
      (err) => {
        this.toastr.error('Error al realizar al consulta.');
      }
    );
  }

  getProduct() {
    console.log("entro");
    this.service.getProduct().subscribe(
      (data : any) => {
        this.projects = data.products;
        console.log(data);
      },
      (err) => {
        this.toastr.error('Error al realizar al consulta.');
      }
    );
  }

  getShared_spaces() {
    console.log("entro");
    this.service.getShared().subscribe(
      (data : any) => {
        this.projects = data.shared_spaces;
        console.log(data);
      },
      (err) => {
        this.toastr.error('Error al realizar al consulta.');
      }
    );
  }
  getProject() {
    console.log("entro");
    this.service.getProject().subscribe(
      (data : any) => {
        this.projects = data.project;
        console.log(data);
      },
      (err) => {
        this.toastr.error('Error al realizar al consulta.');
      }
    );
  }

  
  getServices() {
    this.Expert.getAreas().subscribe(
      (data: any) => {
        this.services = data.areas;
      },
      (errorServicio) => {
        console.log('Ha Ocurrido un error inesperado.');
      }
    );
  }

  show(evt) {
    console.log(evt);
  }

  setArea(min, max) {
    this.area.min = min;
    this.area.max = max;
    console.log(this.area);
  }

  setPrice(min, max) {
    this.price.min = min;
    this.price.max = max;
    console.log(this.price);
  }

  getExperts(address, category, type_verification, company, emergency) {
    this.load = 1;
    this.Expert.getExpert(
      this.address,
      this.category,
      this.type_verification,
      this.company,
      this.emergency
    ).subscribe(
      (data: any) => {
        this.experts = data.experts.data;
        this.load = 0;
      },
      (errorServicio) => {
        console.log('Ha Ocurrido un error inesperado.');
      }
    );
  }

  getSharedSpace() {
    this.service.getSharedSpace(this.filter).subscribe(
      (res: any) => {
        this.projects = res.shared_spaces;
      },
      (err) => {
        console.log('Ha Ocurrido un error inesperado.');
      }
    );
  }

  getProducts() {
    this.service.searchProducts(this.filter).subscribe(
      (res: any) => {
        this.projects = res.shared_spaces;
      },
      (err) => {
        console.log('Ha Ocurrido un error inesperado.');
      }
    );
  }
}
