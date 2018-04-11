<template lang="html">
    <footer class="mdl-grid">
        <div class="mdl-typography--text-center mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet">
            <p>
                <img src="img/CHCS.png" width="150" height="150" alt="CHCS Seals">
            </p>

            <p>
                <a href="https://chcs.uncg.edu/high-point-market-segmentation-study/">About</a> &bull;
                <a href="https://baelearn.uncg.edu/qol/downloads/qol-data.zip">Download Data</a>
            </p>

            <p class="text-muted">
                Created by <a href="https://chcs.uncg.edu//">UNC Greensboro</a>
                with much &#9829; for the projects that make this site possible:
                <br>
                <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>,
                <a href="http://osm2vectortiles.org/" target="_blank">OSM2VectorTiles</a>,
                <a href="https://www.mapbox.com/mapbox-gl-js/api/" target="_blank">Mapbox GL JS</a>,
                <a href="http://vuejs.org/" target="_blank">Vue.js</a>, and
                <a href="http://getmdl.io/" target="_blank">Material Design Lite</a>.
            </p>
            <p class="text-muted">
                <a href="javascript:void(0)" v-on:click="social('twitter')"><img src="img/icon_twitter.svg" alt="share on twitter" style="height: 22px;"></a>
                <a href="javascript:void(0)" v-on:click="social('facebook')"><img src="img/icon_facebook.svg" alt="share on facebook" style="height: 22px;"></a>
                <a href="javascript:void(0)" v-on:click="social('linkedin')"><img src="img/icon_linkedin.svg" alt="share on linkedin" style="height: 22px;"></a>
                <a href="https://github.com/"><img src="img/icon_github.svg" alt="source code on github" style="height: 22px;"></a>
            </p>
        </div>
    </footer>
</template>

<script>
import {metaDescription} from '../modules/meta';

export default {
    name: 'sc-footer',
    watch: {

    },
    methods: {
        social: function (socialType) {
            let _this = this;
            let pageUrl = encodeURIComponent(document.URL);
            if (socialType === 'twitter') {
                let socialUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${encodeURIComponent(_this.sharedState.metric.config.title)}`;
                window.open(socialUrl, "Share");
            }
            if (socialType === 'facebook') {
                let socialUrl = `https://www.facebook.com/sharer.php?u=${pageUrl}`;
                window.open(socialUrl, "Share");
            }
            if (socialType === 'linkedin') {
                let socialUrl = `https://www.linkedin.com/shareArticle?url=${pageUrl}`;
                window.open(socialUrl, "Share");
            }
        }
    }
}
</script>

<style lang="css" scoped>

</style>
