/**
 * @file      igw.test.js
 * @brief     This class is designed to test the behaviour of an IGW (Internet Gateway).
 * @author    Mélodie Ohan
 * @version   11-05-2022 - original (dedicated to VIR1)
 *
 */

 "use strict";
const IgwHelper = require("../igw/IgwHelper.js");
const IgwNotFoundException = require("../igw/IgwNotFoundException.js");
const IgwNameNotAvailableException = require("../igw/IgwNameNotAvailableException.js");

let igwHelper = null;
let igwName = "";

beforeEach(() => {
    igwHelper = new IgwHelper("eu-west-3");
    igwName = "myIgwName";
});

test('exists_NotFound_Success', async() => {
    // given
    // refer to before each method

    // when

    // then
    expect(await igwHelper.exists(igwName)).toEqual(false);
})

test('create_CreateIgw_Success', async() => {
    // given
    // refer to before each method

    // when
    await igwHelper.create(igwName);

    // then
    //test if exists using the igw name
    expect(await igwHelper.exists(igwName)).toEqual(true);
})

test('exists_NominalCase_Success', async() => {
    // given
    // refer to before each method

    // when
    //Event is called directly by the assertion

    // then
    expect(await igwHelper.exists(igwName)).toEqual(true);
})

test('create_IgwNameNotAvailable_ThrowException', async () => {
    // given
    // refer to before each method

    // when
    await expect(igwHelper.create(igwName)).rejects.toThrow(IgwNameNotAvailableException);

    // then
    // Exception is thrown
})

test('all_GetListOfAllIgw_Success', async() => {
    // given 
    // refer to before each method

    // when
    let list = await igwHelper.all();

    // then
    //TODO NGY - what's the purpose of the assertion ?
    expect(list.length).not.toEqual(0);
})

/**
 * @depends-on find_getExistingIgw_success
 * @depends-on find_getNotExistentIgw_success
 */
 test('delete_NominalCase_Success', async () => {
    // given

    // when
    await igwHelper.delete(igwName);

    // then
    let id = await igwHelper.findId(igwHelper);
    expect(id).toEqual(null);
})

/**
 * @depends-on find_getExistingIgw_success
 * @depends-on find_getNotExistentIgw_success
 */
 test('delete_deleteNonExistentIgw_ThrowException', async () => {
    // given
    igwName = "Igw-test-deploy-100";

    // when
    await expect(igwHelper.delete(igwName)).rejects.toThrow(IgwNotFoundException);

    // then
     // Exception is thrown
})
