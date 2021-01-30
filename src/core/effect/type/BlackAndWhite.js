/**
 * @Author: Caven
 * @Date: 2020-08-14 23:51:47
 */

const { State } = DC

const { Cesium } = DC.Namespace

class BlackAndWhite {
  constructor() {
    this._viewer = undefined
    this._delegate = undefined
    this._enable = false
    this._gradations = 1
    this._selected = []
    this.type = 'black_and_white'
    this._state = State.INITIALIZED
  }

  set enable(enable) {
    this._enable = enable
    if (enable && this._viewer && !this._delegate) {
      this._createPostProcessStage()
    }
    this._delegate && (this._delegate.enabled = enable)
    return this
  }

  get enable() {
    return this._enable
  }

  set gradations(gradations) {
    this._gradations = gradations
    this._delegate && (this._delegate.uniforms.gradations = gradations)
    return this
  }

  get gradations() {
    return this._gradations
  }

  set selected(selected) {
    this._selected = selected
    this._delegate && (this._delegate.selected = selected)
    return this
  }

  get selected() {
    return this._selected
  }

  /**
   *
   * @private
   */
  _createPostProcessStage() {
    this._delegate = Cesium.PostProcessStageLibrary.createBlackAndWhiteStage()
    if (this._delegate) {
      this._delegate.uniforms.gradations = this._gradations
      this._viewer.scene.postProcessStages.add(this._delegate)
    }
  }

  /**
   *
   * @param viewer
   * @returns {BlackAndWhite}
   */
  addTo(viewer) {
    if (!viewer) {
      return this
    }
    this._viewer = viewer
    this._state = State.ADDED
    return this
  }
}

export default BlackAndWhite
