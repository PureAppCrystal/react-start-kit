const loggerMiddleware = store => next => action => {
    //
    // 현재 상태
    console.log("현재 상태 : ", store.getState());
    // 액션 기록
    console.log("액션 : ", action);

    // 액션을 다음 미들웨어 또는 리듀서로 넘긴다.
    const result = next(action);

    //액션 처리 후의 스토어 상태를 기록한다.
    console.log("다음 상태 : ", store.getState());
    console.log("\n")

    return result; // 반환하는 값은 store.dispatch(ACTION_TYPE) 했을 때 결과로 설정.
}

export default loggerMiddleware;