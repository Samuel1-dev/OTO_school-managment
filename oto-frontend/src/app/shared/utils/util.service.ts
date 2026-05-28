import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  /**
   * Formate une date au format 'dd/mm/yyyy'
   */
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Convertit une date au format ISO 'yyyy-mm-dd'
   */
  toISODate(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Vérifie si une chaîne est un email valide
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Vérifie si une chaîne est un numéro de téléphone valide (format Bénin)
   */
  isValidPhoneBeninFormat(phone: string): boolean {
    // Format: +229 ou 229 suivi de 8 chiffres
    const phoneRegex = /^(\+229|229)?[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Génère un matricule unique pour un élève
   */
  generateMatricule(): string {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000);
    return `ELV-${year}-${random}`;
  }

  /**
   * Formate un nombre comme devise (FCFA)
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
    }).format(amount);
  }

  /**
   * Tronque une chaîne à une longueur donnée avec ellipsis
   */
  truncate(str: string, length: number): string {
    if (str.length <= length) {
      return str;
    }
    return str.slice(0, length) + '...';
  }

  /**
   * Crée un slug à partir d'une chaîne
   */
  slugify(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Calcule l'âge à partir d'une date de naissance
   */
  calculateAge(birthDate: string | Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }

  /**
   * Formate un nom et prénom (capitalize)
   */
  formatName(firstName: string, lastName: string): string {
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return `${capitalize(firstName)} ${capitalize(lastName)}`;
  }

  /**
   * Trie un tableau d'objets par une clé spécifique
   */
  sortByKey<T>(arr: T[], key: keyof T, ascending: boolean = true): T[] {
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) return ascending ? -1 : 1;
      if (a[key] > b[key]) return ascending ? 1 : -1;
      return 0;
    });
  }

  /**
   * Crée une copie profonde d'un objet
   */
  deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Fusionne deux objets
   */
  merge<T>(obj1: T, obj2: Partial<T>): T {
    return { ...obj1, ...obj2 };
  }

  /**
   * Vérifie si un array est vide
   */
  isEmpty<T>(arr: T[]): boolean {
    return !arr || arr.length === 0;
  }

  /**
   * Crée un délai (utilisé pour les tests)
   */
  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
