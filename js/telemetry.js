/**
 * @license
 * Copyright 2017 Nicolai Schmid All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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