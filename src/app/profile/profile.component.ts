import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {
    let init = 0, target = 1001;

    const updateCounter = () => {
      if (init < target) {
        setTimeout(() => {
          init += 1;
          counter.innerHTML = init.toString();

          if (init > 100) {
            counter.innerHTML = "100+";
          }
          if (init <= 100) {
            updateCounter();
          }
        }, 15);
      }
    };

    let counter = document.getElementById('counter') as HTMLElement;
    counter.innerHTML = init.toString();
    updateCounter();
  }


}
