// [console.assert not throwing with v22.4.0](https://github.com/facebook/jest/issues/5634)
import assert from 'node:assert';

console.assert = assert;
