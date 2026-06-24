const { spawn } = require('child_process');

const allowFail = process.env.REACT_SNAP_ALLOW_FAIL === 'true';

const child = spawn('npx', ['react-snap'], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

child.on('close', (code) => {
  if (code === 0) {
    process.exit(0);
  }

  if (allowFail) {
    console.warn('[react-snap] failed, continuing build (set REACT_SNAP_ALLOW_FAIL=false to enforce).');
    process.exit(0);
  }

  process.exit(code || 1);
});
