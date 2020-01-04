interface CallSite {
  fileName: string;
  lineNumber: number;
  functionName: string;
}

export function getCallSite(ignoreFn: Function = getCallSite): CallSite {
  const capture = { stack: [] as NodeJS.CallSite[] };

  const defaultHandler = Error.prepareStackTrace;
  Error.prepareStackTrace = (obj, trace) => trace;
  Error.captureStackTrace(capture, ignoreFn);
  const { stack } = capture;
  Error.prepareStackTrace = defaultHandler;

  const stackTop = stack[0];

  return {
    fileName: stackTop.getFileName(),
    lineNumber: stackTop.getLineNumber(),
    functionName: stackTop.getFunctionName(),
  };
}
