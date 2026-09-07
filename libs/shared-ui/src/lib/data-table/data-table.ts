import { CommonModule } from '@angular/common';
import { Component, contentChild, input, output, TemplateRef } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

@Component({
  imports: [CommonModule],
  selector: 'rh-data-table',
  styleUrl: './data-table.scss',
  templateUrl: './data-table.html',
})
export class DataTable<T extends Record<string, any> = Record<string, any>> {
  readonly columns = input.required<TableColumn[]>();
  readonly data = input<T[]>([]);
  readonly loading = input<boolean>(false);
  readonly emptyMessage = input<string>('No records found');
  readonly rowClick = output<T>();
  // Optional custom row template support
  readonly rowTemplate = contentChild<TemplateRef<{ $implicit: T; index: number }>>('rowTemplate');
  getCellValue(row: T, key: string): any {
    if (!row) return '';
    // Supports nested keys like "category.name"
    if (key.includes('.')) {
      return key.split('.').reduce((acc, part) => acc?.[part], row) ?? '';
    }
    return row[key] ?? '';
  }
  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }
}
