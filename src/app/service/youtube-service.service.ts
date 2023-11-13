import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class YoutubeServiceService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3/';

  constructor(private http: HttpClient) { }

  getUploadsPlaylistId(apiKey: string, channelId: string): Observable<any> {
    const url = `${this.apiUrl}channels`;
    const params = {
      key: apiKey,
      part: 'contentDetails',
      id: channelId
    };

    return this.http.get(url, { params });
  }

  getChannelVideos(apiKey:string, playlistId: string): Observable<any> {
    const url = `${this.apiUrl}playlistItems`;
    const params = {
      key: apiKey,
      part: 'snippet',
      playlistId: playlistId,
      maxResults: '10'  // Adjust as needed
    };
    return this.http.get(url, {params});
    
  }


}
