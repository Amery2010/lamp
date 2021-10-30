/**
 * 使用洗牌算法对数组随机排序
 * @see https://github.com/ccforward/cc/issues/44
 * @param arr 需要随机排序的数组
 * @returns 随机排序后的数组
 * @example
 * ```
 * shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) => [ 9, 7, 6, 0, 4, 2, 3, 8, 5, 1 ]
 * shuffle(['a', 'b', 'c', 'd', 'e', 'f']) => [ 'a', 'f', 'e', 'b', 'd', 'c' ]
 * shuffle([0, '1', 'a', { B: 'b'}, ['c', 'd'], 5]) => [ 'a', { B: 'b' }, [ 'c', 'd' ], 5, '1', 0 ]
 * ```
 * @author Amery
 * @version v0.3.0
 * @since v0.3.0
 */
declare function shuffle<T>(arr: Array<T>): Array<T>;
export default shuffle;
