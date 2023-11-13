import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  selectedMovie!: string;
  playerVars = {
    autoplay: 1,
    controls: 1,
    modestbranding: 1,
    showinfo: 0,
    rel: 0,
  };

  public videoUrl!: string;
  public movieId: string = '-zFQiu_tcTw';

  public safeVideoUrl!: SafeResourceUrl;

  

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.videoUrl = `https://www.youtube.com/embed/${this.movieId}?autoplay=0&mute=1&vq=hd1080`;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  onMovieSelected(movie: string):void {
    this.playMovie(movie);
  }

  playMovie(movie: string): void {
    this.videoUrl = `https://www.youtube.com/embed/${movie}?autoplay=1&mute=1&vq=hd1080`;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

}
