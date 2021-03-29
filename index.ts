import bugreplay from 'bugreplay-automation'
import { ClientFunction } from 'testcafe';

// @ts-ignore
const dispatch = new ClientFunction((payload) => {
    window.postMessage({
        type: 'REDUX_DISPATCH',
        payload: payload
    }, '*');
});
// @ts-ignore
const setup = new ClientFunction(bugreplay.setup, { dependencies: { dispatch }})
// @ts-ignore
const startRecording = new ClientFunction(bugreplay.startRecording, { dependencies: { dispatch }})
// @ts-ignore
const stopRecording= new ClientFunction(bugreplay.stopRecording, { dependencies: { dispatch }})
// @ts-ignore
const saveRecording = new ClientFunction(bugreplay.saveRecording, { dependencies: { dispatch }})

type BugReplayConfig = {
  apiKey: string
}

export default function bugReplay(fixture:any, config:BugReplayConfig) {
  const { apiKey } = config
  return fixture
    .meta("testRunId", process.env.TEST_RUN_ID || new Date().toISOString())
    .beforeEach( async (t:any) => {
      await setup(apiKey)
      await startRecording()
    })
    .afterEach( async (t:any) => {
      const time = (new Date()).toISOString() 
      const testName = t.testRun.test.name
      const fixtureName = t.testRun.test.fixture.name
      const testRunId = t.testRun.test.fixture.meta.testRunId
      console.log(testRunId)
      const passed = t.testRun.errs.length == 0
      await stopRecording()
      await saveRecording(`TestCafe - ${fixtureName} - ${testName} - ${time}`, {
        test_hierarchy: [fixtureName, testName].join(' > '),
        test_passed: passed,
        test_run_id: testRunId
      })
    });
}
