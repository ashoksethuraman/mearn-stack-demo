import { Component, OnInit, Input } from '@angular/core';
import { UserService, User } from '../services/user';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService) { }

  // @Input() users: User[] = [];

  public currentPage = 1;
  public pageSize = 5;
  public users: User[] = [];

  ngOnInit() {
    // Fetch users from the service
    this.userService.getUsers().subscribe(data => {
      console.log('users', data)
      this.users = data;
    });
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }

  get paginatedData(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    console.log('paginatedData', this.users);
    return this.users.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  handleDownload(user: User) {
    console.log('Download file for:', user);
    // implement your download logic
  }

  handleEdit(user: User) {
    console.log('Edit user:', user);
    // open modal here
  }

  handleDelete(userId: string) {
    console.log('Delete user:', userId);
    // call delete API
  }
}