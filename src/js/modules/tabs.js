// Модуль работы с табами =======================================================================================================================================================================================================================
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body

Если нужно чтобы табы открывались с анимацией
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms,
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры" на неком размере экранов пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
import {dataMediaQueries} from "./dataMediaQueries.js";
import {slide} from "../base/index.js";

export function tabs() {
    const tabs = document.querySelectorAll('[data-tabs]');
    let tabsActiveHash = [];

    if (tabs.length > 0) {
        const hash = location.hash.replace('#', '');
        if (hash.startsWith('tab-')) {
            tabsActiveHash = hash.replace('tab-', '').split('-');
        }
        tabs.forEach((tabsBlock, index) => {
            tabsBlock.classList.add('_tab-init');
            tabsBlock.setAttribute('data-tabs-index', index);
            tabsBlock.addEventListener("click", setTabsAction);
            initTabs(tabsBlock);
        });

        // Получение слойлеров с медиа запросами
        let mdQueriesArray = dataMediaQueries(tabs, "tabs");
        if (mdQueriesArray && mdQueriesArray.length) {
            mdQueriesArray.forEach(mdQueriesItem => {
                // Событие
                mdQueriesItem.matchMedia.addEventListener("change", function () {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }
    }

    // Установка позиций заголовков
    function setTitlePosition(tabsMediaArray, matchMedia) {
        tabsMediaArray.forEach(tabsMediaItem => {
            tabsMediaItem = tabsMediaItem.item;
            const tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
            const tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
            const tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
            const tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
            tabsContentItems.forEach((tabsContentItem, index) => {
                if (matchMedia.matches) {
                    tabsContent.append(tabsTitleItems[index]);
                    tabsContent.append(tabsContentItem);
                    tabsMediaItem.classList.add('_tab-spoller');
                } else {
                    tabsTitles.append(tabsTitleItems[index]);
                    tabsMediaItem.classList.remove('_tab-spoller');
                }
            });
        });
    }

    // Работа с контентом
    function initTabs(tabsBlock) {
        const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
        const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
        const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
        const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

        if (tabsActiveHashBlock) {
            const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
            tabsActiveTitle.classList.remove('_tab-active');
        }
        if (tabsContent.length > 0) {
            tabsContent.forEach((tabsContentItem, index) => {
                tabsTitles[index].setAttribute('data-tabs-title', '');
                tabsContentItem.setAttribute('data-tabs-item', '');

                if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
                    tabsTitles[index].classList.add('_tab-active');
                }
                tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
            });
        }
    }

    function setTabsStatus(tabsBlock) {
        const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
        const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
        const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

        function isTabsAnamate(tabsBlock) {
            if (tabsBlock.hasAttribute('data-tabs-animate')) {
                return tabsBlock.dataset.tabsAnimate > 0 ? tabsBlock.dataset.tabsAnimate : 500;
            }
        }

        const tabsBlockAnimate = isTabsAnamate(tabsBlock);

        if (tabsContent.length > 0) {
            tabsContent.forEach((tabsContentItem, index) => {
                if (tabsTitles[index].classList.contains('_tab-active')) {
                    if (tabsBlockAnimate) {
                        slide.down(tabsContentItem, tabsBlockAnimate);
                    } else {
                        tabsContentItem.hidden = false;
                    }
                    if (!tabsContentItem.closest('.popup')) {
                        location.hash = `tab-${tabsBlockIndex}-${index}`;
                    }
                } else {
                    if (tabsBlockAnimate) {
                        slide.up(tabsContentItem, tabsBlockAnimate);
                    } else {
                        tabsContentItem.hidden = true;
                    }
                }
            });
        }
    }

    function setTabsAction(e) {
        const el = e.target;
        if (el.closest('[data-tabs-title]')) {
            const tabTitle = el.closest('[data-tabs-title]');
            const tabsBlock = tabTitle.closest('[data-tabs]');
            if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelectorAll('._slide').length) {
                const tabActiveTitle = tabsBlock.querySelector('[data-tabs-title]._tab-active');
                if (tabActiveTitle) {
                    tabActiveTitle.classList.remove('_tab-active');
                }
                tabTitle.classList.add('_tab-active');
                setTabsStatus(tabsBlock);
            }
            e.preventDefault();
        }
    }
}