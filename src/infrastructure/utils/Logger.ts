import { $log } from "ts-log-debug";

export const getLogger = () => {
    $log.level = 'debug'
    $log.name = 'App'
    return $log
}