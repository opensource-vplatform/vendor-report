import { IconType } from './constant';
import styled from 'styled-components';
const iconData = {
    [IconType.Hair]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lMTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE02LDcgTDYsOCBMNyw4IEw3LDcgTDYsNyBaIE04LDcgTDgsOCBMOSw4IEw5LDcgTDgsNyBaIE0xMCw3IEwxMCw4IEwxMSw4IEwxMSw3IEwxMCw3IFogTTEyLDcgTDEyLDggTDEzLDggTDEzLDcgTDEyLDcgWiBNMTQsNyBMMTQsOCBMMTUsOCBMMTUsNyBMMTQsNyBaIE0xNiw3IEwxNiw4IEwxNyw4IEwxNyw3IEwxNiw3IFogTTE4LDcgTDE4LDggTDE5LDggTDE5LDcgTDE4LDcgWiBNMjAsNyBMMjAsOCBMMjEsOCBMMjEsNyBMMjAsNyBaIE0yMiw3IEwyMiw4IEwyMyw4IEwyMyw3IEwyMiw3IFogTTI0LDcgTDI0LDggTDI1LDggTDI1LDcgTDI0LDcgWiBNMjYsNyBMMjYsOCBMMjcsOCBMMjcsNyBMMjYsNyBaIE0yOCw3IEwyOCw4IEwyOSw4IEwyOSw3IEwyOCw3IFogTTMwLDcgTDMwLDggTDMxLDggTDMxLDcgTDMwLDcgWiBNMzIsNyBMMzIsOCBMMzMsOCBMMzMsNyBMMzIsNyBaIE0zNCw3IEwzNCw4IEwzNSw4IEwzNSw3IEwzNCw3IFogTTM2LDcgTDM2LDggTDM3LDggTDM3LDcgTDM2LDcgWiBNMzgsNyBMMzgsOCBMMzksOCBMMzksNyBMMzgsNyBaIE00MCw3IEw0MCw4IEw0MSw4IEw0MSw3IEw0MCw3IFogTTQyLDcgTDQyLDggTDQzLDggTDQzLDcgTDQyLDcgWiBNNDQsNyBMNDQsOCBMNDUsOCBMNDUsNyBMNDQsNyBaIE00Niw3IEw0Niw4IEw0Nyw4IEw0Nyw3IEw0Niw3IFogTTQ4LDcgTDQ4LDggTDQ5LDggTDQ5LDcgTDQ4LDcgWiBNNTAsNyBMNTAsOCBMNTEsOCBMNTEsNyBMNTAsNyBaIE01Miw3IEw1Miw4IEw1Myw4IEw1Myw3IEw1Miw3IFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+)',
    [IconType.Dotted]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE02LDcgTDYsOCBMOCw4IEw4LDcgTDYsNyBaIE0xMCw3IEwxMCw4IEwxMiw4IEwxMiw3IEwxMCw3IFogTTE0LDcgTDE0LDggTDE2LDggTDE2LDcgTDE0LDcgWiBNMTgsNyBMMTgsOCBMMjAsOCBMMjAsNyBMMTgsNyBaIE0yMiw3IEwyMiw4IEwyNCw4IEwyNCw3IEwyMiw3IFogTTI2LDcgTDI2LDggTDI4LDggTDI4LDcgTDI2LDcgWiBNMzAsNyBMMzAsOCBMMzIsOCBMMzIsNyBMMzAsNyBaIE0zNCw3IEwzNCw4IEwzNiw4IEwzNiw3IEwzNCw3IFogTTM4LDcgTDM4LDggTDQwLDggTDQwLDcgTDM4LDcgWiBNNDIsNyBMNDIsOCBMNDQsOCBMNDQsNyBMNDIsNyBaIE00Niw3IEw0Niw4IEw0OCw4IEw0OCw3IEw0Niw3IFogTTUwLDcgTDUwLDggTDUyLDggTDUyLDcgTDUwLDcgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=)',
    [IconType.DashDotDot]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lMzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lMyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE01LDcgTDUsOCBMOSw4IEw5LDcgTDUsNyBaIE0xMiw3IEwxMiw4IEwxNSw4IEwxNSw3IEwxMiw3IFogTTE4LDcgTDE4LDggTDIxLDggTDIxLDcgTDE4LDcgWiBNMjQsNyBMMjQsOCBMMzQsOCBMMzQsNyBMMjQsNyBaIE0zNyw3IEwzNyw4IEw0MCw4IEw0MCw3IEwzNyw3IFogTTQzLDcgTDQzLDggTDQ2LDggTDQ2LDcgTDQzLDcgWiBNNDksNyBMNDksOCBMNTMsOCBMNTMsNyBMNDksNyBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==)',
    [IconType.DashDot]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lNDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE01LDcgTDUsOCBMMTMsOCBMMTMsNyBMNSw3IFogTTE5LDcgTDE5LDggTDI3LDggTDI3LDcgTDE5LDcgWiBNMzMsNyBMMzMsOCBMNDEsOCBMNDEsNyBMMzMsNyBaIE00Nyw3IEw0Nyw4IEw1Myw4IEw1Myw3IEw0Nyw3IFogTTE1LDcgTDE1LDggTDE3LDggTDE3LDcgTDE1LDcgWiBNMjksNyBMMjksOCBMMzEsOCBMMzEsNyBMMjksNyBaIE00Myw3IEw0Myw4IEw0NSw4IEw0NSw3IEw0Myw3IFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+)',
    [IconType.Dashed]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lNTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lNSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE01LDcgTDUsOCBMOCw4IEw4LDcgTDUsNyBaIE0xMCw3IEwxMCw4IEwxMyw4IEwxMyw3IEwxMCw3IFogTTE1LDcgTDE1LDggTDE4LDggTDE4LDcgTDE1LDcgWiBNMjAsNyBMMjAsOCBMMjMsOCBMMjMsNyBMMjAsNyBaIE0yNSw3IEwyNSw4IEwyOCw4IEwyOCw3IEwyNSw3IFogTTMwLDcgTDMwLDggTDMzLDggTDMzLDcgTDMwLDcgWiBNMzUsNyBMMzUsOCBMMzgsOCBMMzgsNyBMMzUsNyBaIE00MCw3IEw0MCw4IEw0Myw4IEw0Myw3IEw0MCw3IFogTTQ1LDcgTDQ1LDggTDQ4LDggTDQ4LDcgTDQ1LDcgWiBNNTAsNyBMNTAsOCBMNTMsOCBMNTMsNyBMNTAsNyBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==)',
    [IconType.Thin]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lNjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lNiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE01LDcgTDUsOCBMNTMsOCBMNTMsNyBMNSw3IFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+)',

    [IconType.MediumDashDotDot]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lNzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lNyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE01LDYgTDUsOCBMMTMsOCBMMTMsNiBMNSw2IFogTTI4LDYgTDI4LDggTDM2LDggTDM2LDYgTDI4LDYgWiBNMTYsNiBMMTYsOCBMMTksOCBMMTksNiBMMTYsNiBaIE0zOSw2IEwzOSw4IEw0Miw4IEw0Miw2IEwzOSw2IFogTTIyLDYgTDIyLDggTDI1LDggTDI1LDYgTDIyLDYgWiBNNDUsNiBMNDUsOCBMNDgsOCBMNDgsNiBMNDUsNiBaIE01MCw2IEw1MCw4IEw1Myw4IEw1Myw2IEw1MCw2IFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+)',
    [IconType.SlantedDashDot]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lOCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE01LDYgTDUsOCBMMTUsOCBMMTUsNiBMNSw2IFogTTEzLDYgTDEzLDcgTDE2LDcgTDE2LDYgTDEzLDYgWiBNMjAsNiBMMjAsNyBMMjMsNyBMMjMsNiBMMjAsNiBaIE0zMiw2IEwzMiw3IEwzNSw3IEwzNSw2IEwzMiw2IFogTTM5LDYgTDM5LDcgTDQyLDcgTDQyLDYgTDM5LDYgWiBNNTEsNiBMNDMsNiBMNDMsOCBMNTMsOCBMNTMsNyBMNTQsNyBMNTQsNiBMNTEsNiBaIE0yNCw2IEwyNCw4IEwzNCw4IEwzNCw2IEwyNCw2IFogTTE3LDYgTDE3LDggTDIyLDggTDIyLDYgTDE3LDYgWiBNMzYsNiBMMzYsOCBMNDEsOCBMNDEsNiBMMzYsNiBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==)',
    [IconType.MediumDashDot]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lOTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lOSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE01LDYgTDUsOCBMMTUsOCBMMTUsNiBMNSw2IFogTTI0LDYgTDI0LDggTDM0LDggTDM0LDYgTDI0LDYgWiBNNDMsNiBMNDMsOCBMNTMsOCBMNTMsNiBMNDMsNiBaIE0xOCw2IEwxOCw4IEwyMSw4IEwyMSw2IEwxOCw2IFogTTM3LDYgTDM3LDggTDQwLDggTDQwLDYgTDM3LDYgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=)',
    [IconType.MediumDashed]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lMTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJMaW5lMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAsMCBMNTgsMCBMNTgsMTQgTDAsMTQgTDAsMCBaIE02LDcgTDYsOCBMNyw4IEw3LDcgTDYsNyBaIE04LDcgTDgsOCBMOSw4IEw5LDcgTDgsNyBaIE0xMCw3IEwxMCw4IEwxMSw4IEwxMSw3IEwxMCw3IFogTTEyLDcgTDEyLDggTDEzLDggTDEzLDcgTDEyLDcgWiBNMTQsNyBMMTQsOCBMMTUsOCBMMTUsNyBMMTQsNyBaIE0xNiw3IEwxNiw4IEwxNyw4IEwxNyw3IEwxNiw3IFogTTE4LDcgTDE4LDggTDE5LDggTDE5LDcgTDE4LDcgWiBNMjAsNyBMMjAsOCBMMjEsOCBMMjEsNyBMMjAsNyBaIE0yMiw3IEwyMiw4IEwyMyw4IEwyMyw3IEwyMiw3IFogTTI0LDcgTDI0LDggTDI1LDggTDI1LDcgTDI0LDcgWiBNMjYsNyBMMjYsOCBMMjcsOCBMMjcsNyBMMjYsNyBaIE0yOCw3IEwyOCw4IEwyOSw4IEwyOSw3IEwyOCw3IFogTTMwLDcgTDMwLDggTDMxLDggTDMxLDcgTDMwLDcgWiBNMzIsNyBMMzIsOCBMMzMsOCBMMzMsNyBMMzIsNyBaIE0zNCw3IEwzNCw4IEwzNSw4IEwzNSw3IEwzNCw3IFogTTM2LDcgTDM2LDggTDM3LDggTDM3LDcgTDM2LDcgWiBNMzgsNyBMMzgsOCBMMzksOCBMMzksNyBMMzgsNyBaIE00MCw3IEw0MCw4IEw0MSw4IEw0MSw3IEw0MCw3IFogTTQyLDcgTDQyLDggTDQzLDggTDQzLDcgTDQyLDcgWiBNNDQsNyBMNDQsOCBMNDUsOCBMNDUsNyBMNDQsNyBaIE00Niw3IEw0Niw4IEw0Nyw4IEw0Nyw3IEw0Niw3IFogTTQ4LDcgTDQ4LDggTDQ5LDggTDQ5LDcgTDQ4LDcgWiBNNTAsNyBMNTAsOCBMNTEsOCBMNTEsNyBMNTAsNyBaIE01Miw3IEw1Miw4IEw1Myw4IEw1Myw3IEw1Miw3IFoiIGlkPSLlvaLnirbnu5PlkIgiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+)',
    [IconType.Medium]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lMTE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iTGluZTExIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCwwIEw1OCwwIEw1OCwxNCBMMCwxNCBMMCwwIFogTTUsNiBMNSw4IEw1Myw4IEw1Myw2IEw1LDYgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=)',
    [IconType.Thick]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lMTI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iTGluZTEyIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCwwIEw1OCwwIEw1OCwxNCBMMCwxNCBMMCwwIFogTTUsNiBMNSw5IEw1Myw5IEw1Myw2IEw1LDYgWiIgaWQ9IuW9oueKtue7k+WQiCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=)',
    [IconType.Double]:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgNTggMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5MaW5lMTM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iTGluZTEzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCwwIEw1OCwwIEw1OCwxNCBMMCwxNCBMMCwwIFogTTUsNiBMNSw3IEw1Myw3IEw1Myw2IEw1LDYgWiBNNSw4IEw1LDkgTDUzLDkgTDUzLDggTDUsOCBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==)',
};

const IconDiv = styled.div`
    height: 14px;
    width: 60px;
    border: 1px solid white;
    background: black;
    background-size: 100% 100%;
    background-origin: border-box;
    background-repeat: no-repeat;
    cursor: pointer;
`;

function Icon(props) {
    const { type, color, lineType } = props;
    const data = iconData[type];
    const icSt = {};
    const selectedStyle =
        lineType === type
            ? {
                  border: '1px solid black',
                  cursor: 'pointer',
              }
            : {};
    icSt.backgroundImage = data;
    icSt.backgroundColor = color;
    if (type === 0) return <div style={selectedStyle}>None</div>;
    return <IconDiv style={{ ...icSt, ...selectedStyle }}></IconDiv>;
}

export default Icon;