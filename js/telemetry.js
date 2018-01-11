/**
 * @license
 * Copyright (c) 2017 Nicolai Schmid. All rights reserved.
 * The name Nicolai Schmid may not
 * be used to endorse or promote products derived from
 * this software without specific prior written permission.
 */
class Telemetry {
    constructor() {
        this.value = 0;
        this.rating = 3;
        this.timer = 0;
    }

    move() {
        this.value++;

        if (!this.timer) {
            this.startTimer();
        }

        switch (this.value) {
            case 40: {
                this.rating--;
                break;
            }
            case 50: {
                this.rating--;
                break;
            }
        }
        this.render();
    }

    startTimer() {
        this.timer = (new Date).getTime();

        this.interval = setInterval(() => {
            this.render();
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.value = 0;
        this.rating = 3;
        this.timer = 0;
        this.render();
        clearInterval(this.interval);
    }

    render() {
        // Render moves on screen and in modal
        document.querySelectorAll('.moves').forEach(element => {
            element.textContent = this.value;
        });

        // Render rating on screen and in modal
        document.querySelector('.rating').textContent = this.rating;

        const stars = document.querySelector('.stars');

        if (stars.children.length !== this.rating) {
            stars.innerHTML = '';
            for (let i = 0; i < this.rating; i++) {
                stars.innerHTML += `<li><i class="fa fa-star"></i>`;
            }
        }

        // Render timer
        if (this.timer !== 0) {
            const seconds = Math.round(((new Date).getTime() - this.timer) / 1000);
            document.querySelectorAll('.time').forEach(element => {
                element.textContent = seconds;
            });
        }
    }

}