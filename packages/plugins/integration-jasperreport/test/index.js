import { testTransform } from '../src/transform.js';
import endlessLoop from './units/endlessLoop.js';
import noneEntity from './units/noneEntity.js';

testTransform(endlessLoop);
testTransform(noneEntity);