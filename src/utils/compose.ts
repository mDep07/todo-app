const compose = (...fns: Function[]) => (param: any) => fns.reduceRight((acc, fn) => fn(acc), param);

export default compose;