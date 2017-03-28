fibonacci = ->
  [previous, current] = [1, 1]
  loop
    [previous, current] = [current, previous + current]
    yield current
  return
