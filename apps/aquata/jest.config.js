module.exports = {
  name: 'aquata',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/aquata',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
