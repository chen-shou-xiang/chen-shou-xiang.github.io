<template>
  <div class="home-container">
    <!-- 背景图 -->
    <div class="background-gradient">
      <div class="img-container">
        <img :src="'/images/home-bg1.jpg'" :class="{ active: !isDark }" />
        <img :src="'/images/home-bg1-dark.jpg'" :class="{ active: isDark }" />
      </div>
    </div>

    <!-- 主容器 -->
    <div class="content-wrapper">
      <!-- Left Column - 头像列 -->
      <div class="profile-column">
        <img src="/images/avatar.JPG" alt="CSX" class="avatar" />
        <div class="profile profile-card">
          <p><map-pin />ShenZhen</p>
          <p><School />ECUT</p>
        </div>
        <!-- <div class="tags profile-card">
          <span class="tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="other profile-card">还没想好写什么......</div> -->
      </div>

      <!-- Right Column - 内容列 -->
      <div class="content-column">
        <!-- Top 自我介绍 -->
        <div class="introduction">
          <h1 class="hero-text">Hi,I'm <span>CSX</span></h1>
          <div class="introduction-text">
            👦 <span>Full Stack</span> Developer
          </div>
          <div class="introduction-text">
            📝 The only way to do
            <span class="purpleText">great</span> is to
            <span class="purpleText">love</span> what you do.
          </div>
          <!-- 图标 -->
          <div class="iconContainer">
            <!-- github -->
            <a
              class="iconItem"
              onclick=""
              href="https://github.com/CSX-NeedCoffee/CSX-NeedCoffee.github.io"
            >
              <svg
                t="1704870335945"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2487"
              >
                <path
                  d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                  p-id="2488"
                ></path>
              </svg>
              <div class="iconTip">Github</div>
            </a>
            <!-- Mail -->
            <a class="iconItem" onclick="">
              <svg
                t="1704870588438"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3174"
              >
                <path
                  d="M926.47619 355.644952V780.190476a73.142857 73.142857 0 0 1-73.142857 73.142857H170.666667a73.142857 73.142857 0 0 1-73.142857-73.142857V355.644952l304.103619 257.828572a170.666667 170.666667 0 0 0 220.745142 0L926.47619 355.644952zM853.333333 170.666667a74.044952 74.044952 0 0 1 26.087619 4.778666 72.704 72.704 0 0 1 30.622477 22.186667 73.508571 73.508571 0 0 1 10.678857 17.67619c3.169524 7.509333 5.12 15.652571 5.607619 24.210286L926.47619 243.809524v24.380952L559.469714 581.241905a73.142857 73.142857 0 0 1-91.306666 2.901333l-3.632762-2.925714L97.52381 268.190476v-24.380952a72.899048 72.899048 0 0 1 40.155428-65.292191A72.97219 72.97219 0 0 1 170.666667 170.666667h682.666666z"
                  p-id="3175"
                ></path>
              </svg>
              <div class="iconTip">Mail</div>
            </a>
            <!-- QQ -->
            <a
              class="iconItem"
              onclick="pop('./static/img/qq.jpg')"
              href="javascript:void(0)"
            >
              <svg
                t="1712319361023"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1861"
              >
                <path
                  d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z"
                  p-id="1862"
                ></path>
              </svg>
              <div class="iconTip">QQ</div>
            </a>
            <SunMoonSwitcher v-model="isDark"></SunMoonSwitcher>
          </div>
        </div>
        <!-- Bottom Section -->
        <div class="knowledge-section">
          <!-- 学习笔记 -->
          <div class="notes-column">
            <h3><span class="title-icon">📚</span>学习笔记</h3>
            <div class="item-card">
              <project-item
                title="后端笔记"
                desc="主要技术方向"
                link="/java/"
              />
              <project-item
                title="前端笔记"
                desc="主要技术方向"
                link="/front/"
              />
              <project-item
                title="工具合集"
                desc="站在巨人肩膀上的牛马"
                link="tools/"
              />
            </div>
          </div>
          <!-- 项目 -->
          <!-- <div class="project-column">
            <h3><span class="title-icon">📚</span>项目</h3>
            <div class="item-card">
              <project-item title="后端笔记" desc="主要技术方向" />
              <project-item title="后端笔记" desc="主要技术方向" />
              <project-item title="后端笔记" desc="主要技术方向" />
              <project-item title="后端笔记" desc="主要技术方向" />
            </div>
          </div> -->

          <!-- 文章 -->
          <!--  <div class="articles-column">
            <h3>✍️ 文章</h3>
            <ul class="articles-list">
              <li v-for="article in 2" :key="article">
                <LinkCard
                  id="456"
                  title="CSS 现代布局技术"
                  :tags="['CSS', '布局']"
                  route-name="css-article"
                />
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPin, School } from "lucide-vue-next";
import { useDarkMode } from "vuepress-theme-plume/composables";
import SunMoonSwitcher from "./SunMoonSwitcher.vue";
const isDark = useDarkMode();
</script>

<style scoped lang="scss">
.vp-doc li + li {
  margin-top: 0;
}
h2 {
  margin: 0;
  padding: 0;
}
h3 {
  margin-top: 0;
  font-size: 1.3rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px #fff; /* x偏移 y偏移 模糊半径 颜色 */
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

//  重置浏览器对a标签的默认样式
a:hover,
a:link,
a:visited,
a:active,
a:focus {
  text-decoration: none;
  outline: none;
  border: none;
  color: inherit;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.content-wrapper {
  --text-primary: #fff;

  font-family: "Roboto Mono", "Consolas", monospace;
  color: var(--text-primary);
}
[data-theme="dark"] {
  .content-wrapper {
    --text-primary: #e0e0e0; /* 浅灰（正文） */
  }
}
.home-container {
  position: relative;
  .background-gradient {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    filter: blur(10px);

    .img-container {
      position: relative;
      width: 100%;
      height: 100%;
      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 2.5s ease;
        opacity: 0;

        &.active {
          opacity: 1;
        }
      }
    }
  }

  .content-wrapper {
    position: relative;

    display: flex;
    gap: 2rem;
    max-width: 1350px;
    margin: 0 auto;
    padding: 4rem 2rem;
    min-height: 100vh;

    .profile-column {
      align-self: flex-start;

      width: 200px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      position: sticky;
      top: 64px;

      > .profile {
        > p {
          margin: 0;
          padding: 0;

          display: flex;
          align-items: center;
          gap: 0.5rem;
          svg {
            width: 1.2rem;
            height: 1.2rem;
          }
        }
      }

      > .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;

        .tag {
          background: #e0f7fa;
          color: #00838f;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
      }

      > .avatar {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
        border: 5px solid #fff;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .profile-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 13px;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
    }

    .content-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .introduction {
        .hero-text {
          font-size: 4rem;
          line-height: 1.2;
          font-weight: 800;
          font-family: "Roboto Mono", "Consolas", monospace; /* 现代等宽 */
          margin: 20px 0;

          span {
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200%;
            background-position: 0%;
            font-family: "title";
            animation: backgroundSizeAnimation 10s ease-in-out infinite;
            background-image: linear-gradient(
              120deg,
              #bd34fe,
              #e0321b 30%,
              #41d1ff 60%
            );
          }
        }

        .introduction-text {
          font-size: 20px;
          margin-top: 7px;
          .purpleText {
            font-weight: 800;
            background: #00000010;
            border-radius: 5px;
            font-size: 17px;
            margin: 0 3px;
            padding: 2px 4px;

            color: #2e37e8;
          }
        }

        .iconContainer {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          margin-top: 20px;

          .iconItem {
            width: 49px;
            height: 43px;
            box-sizing: border-box;
            border-radius: 7px;
            display: flex;
            margin-left: 10px;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            background: #00000018;
            align-items: center;
            justify-content: center;
            transition: width 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
            flex-shrink: 0;

            svg {
              width: 22px;
              height: 22px;
              fill: #ffffff;
              font-size: 22px;
              margin-right: 3px;
            }

            .iconTip {
              white-space: nowrap;
              display: none;
            }

            &:hover {
              width: 95px;
              transform: translateY(-2px);
              background: #33333338;

              .iconTip {
                display: block;
              }
            }
          }

          .switchItem {
            width: 55px;
            height: 43px;
            box-sizing: border-box;
            border-radius: 7px;
            display: flex;
            margin-left: 10px;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            background: #00000010;
            align-items: center;
            justify-content: center;
            transition: width 1s ease, opacity 1s ease, transform 1s ease;
            flex-shrink: 0;

            &:hover {
              background-color: #33333338;
            }
          }
        }
      }

      .knowledge-section {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .notes-column,
        .project-column,
        .articles-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .item-card {
          display: flex;
          gap: 20px;
        }

        .title-icon {
          font-size: 1.3rem;
          text-shadow: none;
        }
      }
    }
  }
}

@keyframes highlight {
  from {
    background-position: 150% 0;
  }
  to {
    background-position: -50% 0;
  }
}

@keyframes backgroundSizeAnimation {
  0% {
    background-position-x: 0%;
    background-position-y: 50%;
  }
  50% {
    background-position-x: 100%;
    background-position-y: 50%;
  }
  100% {
    background-position-x: 0%;
    background-position-y: 50%;
  }
}

@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .hero-text {
    font-size: 3rem;
  }

  .knowledge-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-text {
    font-size: 2.5rem;
  }

  .content-wrapper {
    padding: 2rem 1rem;
  }
}
</style>
