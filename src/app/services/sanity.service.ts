import { Injectable } from '@angular/core';
import { createClient } from '@sanity/client';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private client = createClient({
    projectId: 'pd8sy2qw',
    dataset: 'production',
    apiVersion: '2024-03-11',
    useCdn: true,
  });

  fetch(query: string) {
    return this.client.fetch(query);
  }
}
