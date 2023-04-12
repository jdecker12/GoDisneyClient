import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const video = document.getElementById("goDisnyeVideo") as HTMLVideoElement;
     video.src = "./../../assets/img/Disney Trip.MOV";
     //video.play();
  }

}
