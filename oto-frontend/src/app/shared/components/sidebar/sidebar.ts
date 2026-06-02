import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  @Input() navItems: NavItem[] = [];
  @Input() activeSection = '';
  @Input() ecoleNom = '';
  @Input() isOpen = true;
  @Output() sectionChange = new EventEmitter<string>();
  @Output() closeSidebar = new EventEmitter<void>();

  selectSection(id: string): void {
    this.sectionChange.emit(id);
  }
}