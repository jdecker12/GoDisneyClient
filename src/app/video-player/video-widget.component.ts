import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { YoutubeServiceService } from '../service/youtube-service.service';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-video-widget',
  templateUrl: './video-widget.component.html',
  styleUrls: ['./video-widget.component.scss']
})
export class VideoWidgetComponent implements OnInit {
  @Output() chosenMovie = new EventEmitter();

  vidList: string[] = ['Disney Trip.MOV','video1', 'video2', 'video3', 'video4','video5'];

  private apiKey = 'AIzaSyAXTTUf4FthxmrIw-7_1mzHvXszlAV6I2U';
  private channelId = 'UCEPjA8yzBA6oeP23J9RboxA';
  private playlistId = '';

  public playList:[] = [];

  constructor(private ytube: YoutubeServiceService) { }

  ngOnInit(): void {
    this.getplaylist();
    setTimeout(() => {
      this.getVideos();
    }, 2000);
  }

  getplaylist() : void {
    this.ytube.getUploadsPlaylistId(this.apiKey, this.channelId)
    .subscribe({
      next: (response) => {
        console.log(response.items[0].contentDetails.relatedPlaylists.uploads);
        this.playlistId = response.items[0].contentDetails.relatedPlaylists.uploads;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getVideos(): void {
    console.log(this.playlistId);
    this.ytube.getChannelVideos(this.apiKey, this.playlistId)
    .subscribe({
      next: (response) => {
        this.playList = response.items;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  selectVideo(movieName:string): void {
    this.chosenMovie.emit(movieName);
  }

}
